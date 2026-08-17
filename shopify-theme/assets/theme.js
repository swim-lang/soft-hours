(() => {
  const root = window.Shopify?.routes?.root || '/';
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const overlay = qs('[data-overlay]');
  let lastTrigger = null;

  const setExpanded = (selector, value) => qsa(selector).forEach((element) => element.setAttribute('aria-expanded', String(value)));
  const lockPage = (locked) => document.documentElement.classList.toggle('drawer-open', locked);

  function closePanels() {
    qsa('[data-cart-drawer], [data-search-drawer], [data-mobile-menu]').forEach((panel) => {
      panel.setAttribute('aria-hidden', 'true');
      panel.classList.remove('is-open');
    });
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
    panel.classList.add('is-open');
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
      button.textContent = variant.available ? `Add to Cart — ${variant.price}` : 'Sold out';
    }
    if (purchasePanel) purchasePanel.hidden = !variant.available;
    if (notifyPanel) notifyPanel.hidden = variant.available;
    const url = new URL(window.location.href);
    url.searchParams.set('variant', variant.id);
    window.history.replaceState({}, '', url);
  });

  document.addEventListener('click', (event) => {
    const optionButton = event.target.closest('[data-option-button]');
    if (optionButton) {
      const scope = optionButton.closest('[data-product-root]');
      const index = optionButton.dataset.optionIndex;
      const select = qs(`[data-option-select][data-option-index="${index}"]`, scope);
      if (select) {
        select.value = optionButton.dataset.optionValue;
        qsa(`[data-option-button][data-option-index="${index}"]`, scope).forEach((button) => button.setAttribute('aria-pressed', String(button === optionButton)));
        qsa(`[data-option-label="${index}"]`, scope).forEach((label) => { label.textContent = optionButton.dataset.optionValue; });
        if (optionButton.dataset.colourImage) {
          const main = qs('[data-gallery-main]', scope);
          if (main) {
            main.classList.add('is-changing');
            window.setTimeout(() => {
              main.style.backgroundImage = `url("${optionButton.dataset.colourImage}")`;
              main.classList.remove('is-changing');
            }, 160);
          }
        }
        select.dispatchEvent(new Event('change', { bubbles: true }));
      }
    }

    const thumb = event.target.closest('[data-gallery-thumb]');
    if (thumb) {
      const gallery = thumb.closest('[data-gallery]');
      const main = qs('[data-gallery-main]', gallery);
      qsa('[data-gallery-thumb]', gallery).forEach((button) => button.classList.toggle('active', button === thumb));
      if (main) main.style.backgroundImage = `url("${thumb.dataset.galleryThumb}")`;
    }

    const accordionButton = event.target.closest('[data-accordion-button]');
    if (accordionButton) {
      const content = document.getElementById(accordionButton.getAttribute('aria-controls'));
      const willOpen = accordionButton.getAttribute('aria-expanded') !== 'true';
      accordionButton.setAttribute('aria-expanded', String(willOpen));
      if (content) content.hidden = !willOpen;
      const icon = qs('[data-accordion-icon]', accordionButton);
      if (icon) icon.textContent = willOpen ? '−' : '+';
    }

    if (event.target.closest('[data-open-size-guide]')) {
      event.preventDefault();
      qs('[data-size-guide-dialog]')?.showModal();
    }
    if (event.target.closest('[data-close-size-guide]')) qs('[data-size-guide-dialog]')?.close();
  });

  document.addEventListener('change', (event) => {
    const filter = event.target.closest('[data-collection-filter]');
    if (!filter) return;
    const root = filter.closest('.collection-v2');
    const colour = qs('[data-collection-filter="colour"]', root)?.value || 'all';
    const size = qs('[data-collection-filter="size"]', root)?.value || 'all';
    let visible = 0;
    qsa('[data-product-card]', root).forEach((card) => {
      const matchesColour = colour === 'all' || (card.dataset.colours || '').split(/\s+/).includes(colour);
      const matchesSize = size === 'all' || (card.dataset.sizes || '').split(/\s+/).includes(size);
      card.hidden = !(matchesColour && matchesSize);
      if (!card.hidden) visible += 1;
    });
    const status = qs('[data-collection-status]', root);
    if (status) status.textContent = `${visible} ${visible === 1 ? 'piece' : 'pieces'} shown.`;
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
