(() => {
  const root = window.Shopify?.routes?.root || '/';
  const qs = (selector, scope = document) => scope.querySelector(selector);
  const qsa = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const overlay = qs('[data-overlay]');
  const notifyDialog = qs('[data-notify-dialog]');

  function readWishlist() {
    try { return new Set(JSON.parse(window.localStorage.getItem('soft-hours-wishlist') || '[]')); } catch (_) { return new Set(); }
  }

  function setWishlistState(button, saved) {
    button.setAttribute('aria-pressed', String(saved));
    const glyph = button.querySelector('span');
    if (glyph) glyph.textContent = saved ? '♥' : '♡';
  }
  let lastTrigger = null;

  const setExpanded = (selector, value) => qsa(selector).forEach((element) => element.setAttribute('aria-expanded', String(value)));
  const lockPage = (locked) => document.documentElement.classList.toggle('drawer-open', locked);

  function closePanels() {
    qsa('[data-cart-drawer], [data-search-drawer], [data-mobile-menu], [data-collection-filter-drawer], [data-size-guide-drawer]').forEach((panel) => {
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

    const shareArticle = event.target.closest('[data-share-article]');
    if (shareArticle) {
      const shareData = { title: document.title, url: window.location.href };
      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(() => { shareArticle.textContent = 'Link copied'; });
      }
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closePanels();
    if (event.key === 'Tab') {
      const panel = qs('[aria-hidden="false"][data-cart-drawer], [aria-hidden="false"][data-search-drawer], [aria-hidden="false"][data-mobile-menu], [aria-hidden="false"][data-collection-filter-drawer], [aria-hidden="false"][data-size-guide-drawer]');
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
    const wasOpen = qs('[data-cart-drawer]')?.getAttribute('aria-hidden') === 'false';
    if (incoming && current) {
      const incomingDrawer = qs('[data-cart-drawer]', incoming);
      if (wasOpen && incomingDrawer) {
        incomingDrawer.setAttribute('aria-hidden', 'false');
        incomingDrawer.classList.add('is-open');
      }
      current.replaceWith(incoming);
    }
    const count = qs('[data-cart-drawer] [data-cart-count]')?.textContent || '0';
    qsa('[data-cart-count]').forEach((node) => { node.textContent = count; });
    if (open && !wasOpen) {
      const drawer = qs('[data-cart-drawer]');
      drawer.getBoundingClientRect(); // Commit the closed position so the drawer slides in.
      openPanel(drawer, '[data-open-cart]', lastTrigger);
    }
  }

  document.addEventListener('submit', async (event) => {
    const form = event.target.closest('[data-product-form]');
    if (!form) return;
    event.preventDefault();
    const submit = event.submitter || qs('[type="submit"]', form);
    const status = qs('[data-product-status]', form) || qs('[data-product-status]', form.closest('[data-product-card]') || form);
    if (form.hasAttribute('data-requires-size')) {
      const scope = form.closest('[data-product-root]');
      const variants = JSON.parse(qs('[data-variants]', scope)?.textContent || '[]');
      const selectedOptions = qsa('[data-option-select]', form).map((input) => input.value);
      const variant = variants.find((candidate) => candidate.options.every((value, index) => value === selectedOptions[index]));
      const variantInput = qs('[name="id"]', form);
      if (!variant || !variantInput) {
        if (status) status.textContent = 'Select a size before adding this piece.';
        return;
      }
      variantInput.value = String(variant.id);
      variantInput.setAttribute('value', String(variant.id));
    }
    lastTrigger = submit || form.quickTrigger || document.activeElement;
    if (submit) {
      submit.disabled = true;
      submit.setAttribute('aria-busy', 'true');
    }
    if (status) status.textContent = 'Adding to Cart…';
    try {
      const response = await fetch(`${root}cart/add.js`, { method: 'POST', headers: { Accept: 'application/json' }, body: new FormData(form) });
      if (!response.ok) throw new Error((await response.json()).description || 'Unable to add this piece.');
      if (status) status.textContent = '';
      form.closest('[data-card-media]')?.classList.remove('is-quick-open');
      await refreshCart({ open: true });
    } catch (error) {
      if (status) status.textContent = error.message;
    } finally {
      if (submit) {
        submit.disabled = false;
        submit.removeAttribute('aria-busy');
      }
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
    const localization = event.target.closest('[data-localization-select]');
    if (localization) localization.form?.submit();
    const select = event.target.closest('[data-option-select]');
    if (!select) return;
    const scope = select.closest('[data-product-root]');
    const variants = JSON.parse(qs('[data-variants]', scope)?.textContent || '[]');
    const selectedOptions = qsa('[data-option-select]', scope).map((input) => input.value);
    const variant = variants.find((candidate) => candidate.options.every((value, index) => value === selectedOptions[index]));
    const price = qs('[data-product-price]', scope);
    const button = qs('[data-add-to-cart]', scope);
    const productForm = select.closest('[data-product-form]');
    const idInput = qs('[name="id"]', productForm || scope);
    const purchasePanel = qs('[data-purchase-panel]', scope);
    const notifyPanel = qs('[data-notify-panel]', scope);
    if (!variant) {
      if (button) { button.disabled = true; button.textContent = 'Unavailable'; }
      return;
    }
    if (idInput) {
      idInput.value = String(variant.id);
      idInput.setAttribute('value', String(variant.id));
    }
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
    window.setTimeout(() => {
      if (!idInput) return;
      idInput.value = String(variant.id);
      idInput.setAttribute('value', String(variant.id));
    }, 0);
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
        qsa(`[data-option-label="${index}"]`, scope).forEach((label) => { label.textContent = optionButton.textContent.trim() || optionButton.dataset.optionValue; });
        if (optionButton.dataset.colourImage) {
          const main = qs('[data-gallery-main]', scope);
          if (main) {
            main.classList.add('is-changing');
            window.setTimeout(() => {
              if (main.tagName === 'IMG') main.src = optionButton.dataset.colourImage;
              else main.style.backgroundImage = `url("${optionButton.dataset.colourImage}")`;
              main.classList.remove('is-changing');
            }, 160);
          }
        }
        select.dispatchEvent(new Event('change', { bubbles: true }));
        const selectedVariantId = new URL(window.location.href).searchParams.get('variant');
        const variantInput = qs('[name="id"]', optionButton.closest('[data-product-form]') || scope);
        if (selectedVariantId && variantInput) {
          variantInput.value = selectedVariantId;
          variantInput.setAttribute('value', selectedVariantId);
        }
      }
    }

    const thumb = event.target.closest('[data-gallery-thumb]');
    if (thumb) {
      const gallery = thumb.closest('[data-gallery]');
      const main = qs('[data-gallery-main]', gallery);
      qsa('[data-gallery-thumb]', gallery).forEach((button) => button.classList.toggle('active', button === thumb));
      if (main) {
        if (main.tagName === 'IMG') main.src = thumb.dataset.galleryThumb;
        else main.style.backgroundImage = `url("${thumb.dataset.galleryThumb}")`;
      }
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
      const drawer = qs('[data-size-guide-drawer]');
      if (drawer) openPanel(drawer, '[data-open-size-guide]', event.target.closest('[data-open-size-guide]'));
    }
    if (event.target.closest('[data-close-size-guide]')) closePanels();

    const openCollectionFilter = event.target.closest('[data-open-collection-filter]');
    if (openCollectionFilter) {
      const drawer = qs('[data-collection-filter-drawer]');
      if (drawer) openPanel(drawer, '[data-open-collection-filter]', openCollectionFilter);
    }
    if (event.target.closest('[data-close-collection-filter]')) closePanels();

    const cardSize = event.target.closest('[data-card-size]');
    if (cardSize) {
      const form = cardSize.closest('[data-quick-add-form]');
      qs('[data-quick-variant]', form).value = cardSize.dataset.variantId;
      form.quickTrigger = cardSize;
      form.requestSubmit();
    }

    const quickToggle = event.target.closest('[data-quick-toggle]');
    if (quickToggle) {
      const media = quickToggle.closest('[data-card-media]');
      const willOpen = !media.classList.contains('is-quick-open');
      qsa('[data-card-media].is-quick-open').forEach((openMedia) => {
        openMedia.classList.remove('is-quick-open');
        qs('[data-quick-toggle]', openMedia)?.setAttribute('aria-expanded', 'false');
      });
      media.classList.toggle('is-quick-open', willOpen);
      quickToggle.setAttribute('aria-expanded', String(willOpen));
      if (willOpen) qs('.shop-card-sizes button:not([disabled]), .shop-card-add', media)?.focus();
    }

    const imageControl = event.target.closest('[data-card-image-next], [data-card-image-prev]');
    if (imageControl) {
      const card = imageControl.closest('[data-product-card]');
      const image = qs('[data-card-image]', card);
      const images = JSON.parse(image.dataset.images || '[]').filter(Boolean);
      if (images.length > 1) {
        const step = imageControl.hasAttribute('data-card-image-next') ? 1 : -1;
        // Before the first click, hover already shows the second image, so continue from it.
        const hoverShowing = !card.classList.contains('has-browsed-images') && window.matchMedia('(hover: hover)').matches;
        const shown = hoverShowing ? 1 : Number(image.dataset.imageIndex || 0);
        const index = (shown + step + images.length) % images.length;
        image.dataset.imageIndex = String(index);
        image.style.backgroundImage = `url("${images[index]}")`;
        image.style.setProperty('--hover-image', `url("${images[(index + 1) % images.length]}")`);
        card.classList.add('has-browsed-images');
      }
    }

    const wishlist = event.target.closest('[data-wishlist-toggle]');
    if (wishlist) {
      const saved = readWishlist();
      const handle = wishlist.dataset.productHandle;
      if (saved.has(handle)) saved.delete(handle); else saved.add(handle);
      try { window.localStorage.setItem('soft-hours-wishlist', JSON.stringify([...saved])); } catch (_) {}
      qsa(`[data-wishlist-toggle][data-product-handle="${handle}"]`).forEach((button) => setWishlistState(button, saved.has(handle)));
    }

    const notifyTrigger = event.target.closest('[data-card-notify]');
    if (notifyTrigger && notifyDialog) {
      const tags = qs('[data-notify-tags]', notifyDialog);
      const label = qs('[data-notify-product]', notifyDialog);
      if (tags) tags.value = ['notify-me', notifyTrigger.dataset.productHandle, `variant-${notifyTrigger.dataset.variantId}`].filter(Boolean).join(',');
      if (label) label.textContent = `${notifyTrigger.dataset.notifyLabel} is sold out. Leave your email and we will let you know when it returns.`;
      notifyDialog.returnFocus = notifyTrigger;
      notifyDialog.showModal();
    }
    if (event.target.closest('[data-close-notify]') || event.target === notifyDialog) notifyDialog?.close();
  });

  const filterGroups = { size: 'sizes', colour: 'colours' };
  const cardMatches = (card, selected, ignoreGroup) => Object.entries(selected).every(([group, values]) => {
    if (group === ignoreGroup || !values.length) return true;
    const cardValues = (card.dataset[filterGroups[group]] || '').split(/\s+/);
    return values.some((value) => cardValues.includes(value));
  });

  function applyCollectionFilters(root) {
    const options = qsa('[data-filter-option]', root);
    const isSelected = (option) => (option.type === 'checkbox' ? option.checked : option.getAttribute('aria-pressed') === 'true');
    const selected = {};
    Object.keys(filterGroups).forEach((group) => { selected[group] = options.filter((option) => option.dataset.filterGroup === group && isSelected(option)).map((option) => option.dataset.value); });
    const cards = qsa('[data-product-card]', root);
    let visible = 0;
    cards.forEach((card) => {
      card.hidden = !cardMatches(card, selected);
      if (!card.hidden) visible += 1;
    });
    const activeOptions = options.filter(isSelected);
    qsa('[data-campaign-tile]', root).forEach((tile) => { tile.hidden = activeOptions.length > 0; });
    options.forEach((option) => {
      const count = cards.filter((card) => cardMatches(card, { ...selected, [option.dataset.filterGroup]: [option.dataset.value] })).length;
      const countNode = qs('[data-filter-count]', option.closest('label') || option);
      if (countNode) countNode.textContent = `(${count})`;
      const label = option.closest('label') || option;
      label.classList.toggle('is-empty', count === 0 && !isSelected(option));
    });
    qsa('[data-filter-result-count]', root).forEach((node) => { node.textContent = String(visible); });
    const activeCount = qs('[data-filter-active-count]', root);
    if (activeCount) {
      activeCount.hidden = !activeOptions.length;
      activeCount.textContent = activeOptions.length ? ` (${activeOptions.length})` : '';
    }
    const active = qs('[data-filter-active]', root);
    const chips = qs('[data-filter-chips]', root);
    if (active && chips) {
      active.hidden = !activeOptions.length;
      chips.replaceChildren(...activeOptions.map((option) => {
        const chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'filter-chip';
        chip.dataset.filterChip = `${option.dataset.filterGroup}:${option.dataset.value}`;
        chip.setAttribute('aria-label', `Remove filter ${option.dataset.label}`);
        chip.innerHTML = '<span></span><span aria-hidden="true">×</span>';
        chip.firstChild.textContent = option.dataset.label;
        return chip;
      }));
    }
    qsa('[data-filter-empty]', root).forEach((node) => { node.hidden = visible > 0 || !cards.length; });
    const status = qs('[data-collection-status]', root);
    if (status) status.textContent = `${visible} ${visible === 1 ? 'piece' : 'pieces'} shown.`;
  }

  document.addEventListener('change', (event) => {
    const option = event.target.closest('[data-filter-option]');
    if (option) applyCollectionFilters(option.closest('.collection-v2'));
  });

  document.addEventListener('click', (event) => {
    const sizeOption = event.target.closest('button[data-filter-option]');
    const chip = event.target.closest('[data-filter-chip]');
    const clear = event.target.closest('[data-filter-clear]');
    const root = (sizeOption || chip || clear)?.closest('.collection-v2');
    if (!root) return;
    if (sizeOption) sizeOption.setAttribute('aria-pressed', String(sizeOption.getAttribute('aria-pressed') !== 'true'));
    if (chip) {
      const [group, value] = chip.dataset.filterChip.split(':');
      const option = qs(`[data-filter-option][data-filter-group="${group}"][data-value="${value}"]`, root);
      if (option?.type === 'checkbox') option.checked = false; else option?.setAttribute('aria-pressed', 'false');
    }
    if (clear) {
      qsa('[data-filter-option]', root).forEach((option) => {
        if (option.type === 'checkbox') option.checked = false; else option.setAttribute('aria-pressed', 'false');
      });
    }
    applyCollectionFilters(root);
  });

  qsa('.collection-v2').forEach((root) => { if (qs('[data-filter-option]', root)) applyCollectionFilters(root); });

  const closeNavDropdowns = (except) => qsa('[data-nav-dropdown].is-open').forEach((dropdown) => {
    if (dropdown === except) return;
    dropdown.classList.remove('is-open');
    qs('[data-nav-dropdown-toggle]', dropdown)?.setAttribute('aria-expanded', 'false');
  });
  document.addEventListener('click', (event) => {
    const toggle = event.target.closest('[data-nav-dropdown-toggle]');
    const dropdown = event.target.closest('[data-nav-dropdown]');
    closeNavDropdowns(dropdown);
    if (!toggle) return;
    const willOpen = !dropdown.classList.contains('is-open');
    dropdown.classList.toggle('is-open', willOpen);
    toggle.setAttribute('aria-expanded', String(willOpen));
  });
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const openDropdown = qs('[data-nav-dropdown].is-open');
    closeNavDropdowns();
    qs('[data-nav-dropdown-toggle]', openDropdown || document.createElement('div'))?.focus();
    qsa('[data-card-media].is-quick-open').forEach((media) => {
      media.classList.remove('is-quick-open');
      qs('[data-quick-toggle]', media)?.setAttribute('aria-expanded', 'false');
    });
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

  const header = qs('[data-site-header]');
  let lastScrollY = window.scrollY;
  window.addEventListener('scroll', () => {
    if (!header) return;
    const currentY = window.scrollY;
    header.classList.toggle('nav--scrolled', currentY > 20);
    header.classList.toggle('nav--hidden', currentY > 160 && currentY > lastScrollY);
    lastScrollY = currentY;
  }, { passive: true });

  const savedWishlist = readWishlist();
  qsa('[data-wishlist-toggle]').forEach((button) => setWishlistState(button, savedWishlist.has(button.dataset.productHandle)));

  if (notifyDialog) {
    notifyDialog.addEventListener('close', () => notifyDialog.returnFocus?.focus());
    qs('form', notifyDialog)?.addEventListener('submit', () => {
      try { window.sessionStorage.setItem('soft-hours-notify', '1'); } catch (_) {}
    });
    let notifyPosted = false;
    try {
      notifyPosted = window.sessionStorage.getItem('soft-hours-notify') === '1';
      window.sessionStorage.removeItem('soft-hours-notify');
    } catch (_) {}
    if (notifyPosted && (qs('[data-notify-success]', notifyDialog) || qs('[role="alert"]', notifyDialog))) notifyDialog.showModal();
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const syncMotionVideos = () => qsa('.home-hero-video video, .founder-video video, .shop-campaign-media video').forEach((video) => {
    if (reducedMotion.matches) video.pause(); else video.play().catch(() => {});
  });
  syncMotionVideos();
  reducedMotion.addEventListener?.('change', syncMotionVideos);

  const policyBody = qs('.shopify-policy__body');
  if (policyBody) {
    const headings = qsa('h2', policyBody);
    if (headings.length > 1) {
      const list = document.createElement('ol');
      headings.forEach((heading, index) => {
        heading.id ||= `policy-section-${index + 1}`;
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.href = `#${heading.id}`;
        link.textContent = heading.textContent.trim();
        item.append(link);
        list.append(item);
      });
      const toc = document.createElement('nav');
      toc.className = 'policy-toc';
      toc.setAttribute('aria-label', 'Policy contents');
      toc.innerHTML = '<strong>On this page</strong>';
      toc.append(list);
      policyBody.prepend(toc);
    }
  }
})();
