(() => {
  const root = window.Shopify?.routes?.root || '/';
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const overlay = qs('[data-overlay]');
  let lastTrigger = null;

  const setExpanded = (selector, value) => qsa(selector).forEach((element) => element.setAttribute('aria-expanded', String(value)));
  const lockPage = (locked) => document.documentElement.classList.toggle('drawer-open', locked);

  function closePanels() {
    qsa('[data-cart-drawer], [data-search-drawer], [data-mobile-menu]').forEach((panel) => panel.setAttribute('aria-hidden', 'true'));
    setExpanded('[data-open-cart], [data-open-menu]', false);
    overlay.hidden = true;
    lockPage(false);
    if (lastTrigger?.isConnected) lastTrigger.focus();
    lastTrigger = null;
  }

  function openPanel(panel, triggerSelector, trigger = document.activeElement) {
    closePanels();
    lastTrigger = trigger;
    panel.setAttribute('aria-hidden', 'false');
    setExpanded(triggerSelector, true);
    overlay.hidden = false;
    lockPage(true);
    window.setTimeout(() => panel.querySelector('button, [href], input, select, textarea')?.focus(), 60);
  }

  document.addEventListener('click', (event) => {
    const openCart = event.target.closest('[data-open-cart]');
    const openSearch = event.target.closest('[data-open-search]');
    const openMenu = event.target.closest('[data-open-menu]');
    if (openCart) openPanel(qs('[data-cart-drawer]'), '[data-open-cart]', openCart);
    if (openSearch) {
      openPanel(qs('[data-search-drawer]'), '[data-open-search]', openSearch);
      window.setTimeout(() => qs('[data-predictive-search-input]')?.focus(), 80);
    }
    if (openMenu) openPanel(qs('[data-mobile-menu]'), '[data-open-menu]', openMenu);
    if (event.target.closest('[data-close-cart], [data-close-search], [data-close-menu]') || event.target === overlay) closePanels();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePanels();
    if (event.key === 'Tab') {
      const panel = qs('[aria-hidden="false"][data-cart-drawer], [aria-hidden="false"][data-search-drawer], [aria-hidden="false"][data-mobile-menu]');
      if (!panel) return;
      const focusable = qsa('button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])', panel).filter((node) => !node.hidden);
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    }
  });

  async function refreshCart({ open = false } = {}) {
    const response = await fetch(`${root}?sections=cart-drawer-section`, { headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Unable to refresh Cart.');
    const sections = await response.json();
    const parsed = new DOMParser().parseFromString(sections['cart-drawer-section'], 'text/html');
    const incoming = parsed.querySelector('#shopify-section-cart-drawer-content');
    const current = qs('#shopify-section-cart-drawer-content');
    if (incoming && current) current.replaceWith(incoming);
    const count = qs('[data-cart-drawer] [data-cart-count]')?.textContent || '0';
    qsa('[data-cart-count]').forEach((node) => { node.textContent = count; });
    if (open) openPanel(qs('[data-cart-drawer]'), '[data-open-cart]', lastTrigger);
  }

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-product-form]');
    if (!form) return;
    event.preventDefault();
    const submit = qs('[type="submit"]', form);
    const status = qs('[data-product-status]', form);
    submit.disabled = true;
    submit.setAttribute('aria-busy', 'true');
    if (status) status.textContent = 'Adding to Cart…';
    try {
      const response = await fetch(`${root}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error((await response.json()).description || 'Unable to add this piece.');
      await refreshCart({ open: true });
    } catch (error) {
      if (status) status.textContent = error.message;
    } finally {
      submit.disabled = false;
      submit.removeAttribute('aria-busy');
    }
  });

  document.addEventListener('click', async (event) => {
    const control = event.target.closest('[data-cart-change]');
    if (!control) return;
    control.disabled = true;
    try {
      const response = await fetch(`${root}cart/change.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ line: Number(control.dataset.line), quantity: Number(control.dataset.quantity) })
      });
      if (!response.ok) throw new Error('Unable to update Cart.');
      await refreshCart({ open: true });
    } catch (error) {
      const status = qs('[data-cart-status]');
      if (status) status.textContent = error.message;
      control.disabled = false;
    }
  });

  document.addEventListener('change', (event) => {
    const select = event.target.closest('[data-option-select]');
    if (!select) return;
    const scope = select.closest('[data-product-root]');
    const variants = JSON.parse(qs('[data-variants]', scope)?.textContent || '[]');
    const selectedOptions = qsa('[data-option-select]', scope).map((input) => input.value);
    const variant = variants.find((candidate) => candidate.options.every((value, index) => value === selectedOptions[index]));
    const price = qs('[data-product-price]', scope);
    const button = qs('[data-add-to-cart]', scope);
    const idInput = qs('[name="id"]', scope);
    const purchasePanel = qs('[data-purchase-panel]', scope);
    const notifyPanel = qs('[data-notify-panel]', scope);
    if (!variant) {
      if (button) { button.disabled = true; button.textContent = 'Unavailable'; }
      return;
    }
    if (idInput) idInput.value = variant.id;
    if (price) price.textContent = variant.price;
    if (button) {
      button.disabled = !variant.available;
      button.textContent = variant.available ? 'Add to Cart' : 'Sold out';
    }
    if (purchasePanel) purchasePanel.hidden = !variant.available;
    if (notifyPanel) notifyPanel.hidden = variant.available;
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  });

  let predictiveTimer;
  document.addEventListener('input', (event) => {
    const input = event.target.closest('[data-predictive-search-input]');
    if (!input) return;
    window.clearTimeout(predictiveTimer);
    const target = qs('[data-predictive-results]');
    const term = input.value.trim();
    if (term.length < 2) {
      target.innerHTML = '<p>Begin typing to search Collection I and Journal.</p>';
      return;
    }
    predictiveTimer = window.setTimeout(async () => {
      target.innerHTML = '<p>Searching…</p>';
      try {
        const url = `${root}search/suggest.json?q=${encodeURIComponent(term)}&resources[type]=product,article,page&resources[limit]=6`;
        const response = await fetch(url, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error();
        const resources = (await response.json()).resources.results;
        const items = [...resources.products, ...resources.articles, ...resources.pages];
        target.innerHTML = items.length
          ? items.map((item) => `<a href="${item.url}"><span>${item.title}</span><span>View →</span></a>`).join('')
          : '<p>No results. Try another word or browse Collection I.</p>';
      } catch (_) {
        target.innerHTML = '<p>Search is unavailable right now. Please try again.</p>';
      }
    }, 220);
  });
})();
