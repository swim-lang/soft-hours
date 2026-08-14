/* Soft Hours Ecommerce V2 — shared prototype interactions */
(function () {
  'use strict';

  var CART_KEY = 'soft-hours-ecommerce-v2-cart';
  var lastTrigger = null;
  var searchIndex = [
    { title: 'Collection I', type: 'Collection', url: 'shop.html', keywords: 'silk modal still life' },
    { title: 'Top', type: 'Product', url: 'product.html?piece=top', price: 195, image: 'assets/paper/01KV6816HE9450H72167DYES51.png', keywords: 'silk modal green bone bordeaux forest ink' },
    { title: 'Shorts', type: 'Product', url: 'product.html?piece=shorts', price: 195, image: 'assets/paper/01KV681D1WG30XPDZFP0QJ9CEB.jpg', keywords: 'silk modal green bone bordeaux forest ink' },
    { title: 'Shirt', type: 'Product', url: 'product.html?piece=shirt', price: 230, image: 'assets/paper/01KV68456NW8SJZP5R6X551XAH.png', keywords: 'silk modal button down green bone bordeaux forest ink' },
    { title: 'Trousers', type: 'Product', url: 'product.html?piece=trousers', price: 245, image: 'assets/paper/73NVMYR3STMMM9P9G1RHKZ4ZC0.jpg', keywords: 'silk modal pants green bone bordeaux forest ink' },
    { title: 'Slip Dress', type: 'Product', url: 'product.html?piece=slip-dress', price: 290, image: 'assets/paper/01KV684QM8FD71MTJ337JET3W2.jpg', keywords: 'silk modal sleep dress green bone bordeaux forest ink' },
    { title: 'About Soft Hours', type: 'Page', url: 'about.html' },
    { title: 'Journal', type: 'Journal', url: 'journal.html' },
    { title: 'Gift Card', type: 'Product', url: 'gift-card.html' },
    { title: 'Size Guide', type: 'Page', url: 'size-guide.html' },
    { title: 'Delivery & Returns', type: 'Help', url: 'support.html#delivery' }
  ];
  var productCatalog = {
    'top': { name: 'Top', price: 195, description: 'A softly structured layer for slow mornings, early calls, and the hours that belong only to you.', main: 'assets/paper/01KV6816HE9450H72167DYES51.png', images: ['assets/paper/01KV6816HE9450H72167DYES51.png','assets/paper/01KV8PJTD4ZHJEREKVFKW4WWMZ.jpg','assets/v2/product-shirt-01.png'] },
    'shorts': { name: 'Shorts', price: 195, description: 'An easy short with a fluid line, made for first light and unhurried evenings.', main: 'assets/paper/01KV681D1WG30XPDZFP0QJ9CEB.jpg', images: ['assets/paper/01KV681D1WG30XPDZFP0QJ9CEB.jpg','assets/paper/1E8E60JMH7M1YYDYZ445N3ZE6N.jpg','assets/v2/product-shirt-02.png'] },
    'shirt': { name: 'Shirt', price: 230, description: 'A fluid layer for the first hour, the final hour, and the quieter moments between.', main: 'assets/v2/product-shirt-main.jpg', images: ['assets/v2/product-shirt-01.png','assets/v2/product-shirt-02.png','assets/v2/product-shirt-03.png'] },
    'trousers': { name: 'Trousers', price: 245, description: 'An easy full-length trouser designed to move from private hours into the rest of the day.', main: 'assets/paper/73NVMYR3STMMM9P9G1RHKZ4ZC0.jpg', images: ['assets/paper/73NVMYR3STMMM9P9G1RHKZ4ZC0.jpg','assets/paper/01KV8PYRHCSVV1QXRGET4FSMV8.jpg','assets/v2/product-shirt-03.png'] },
    'slip-dress': { name: 'Slip Dress', price: 290, description: 'A long, fluid silhouette for evenings in, mornings out, and every soft interval between.', main: 'assets/paper/01KV684QM8FD71MTJ337JET3W2.jpg', images: ['assets/paper/01KV684QM8FD71MTJ337JET3W2.jpg','assets/paper/1EGC81TPPFQHCGCEZ8AM9AFN3H.png','assets/v2/product-shirt-01.png'] }
  };

  function money(value) {
    return 'EUR ' + Number(value).toFixed(0);
  }

  function readCart() {
    try { return JSON.parse(localStorage.getItem(CART_KEY) || '[]'); }
    catch (_) { return []; }
  }

  function writeCart(cart) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    renderCart();
  }

  function cartCount(cart) {
    return cart.reduce(function (total, item) { return total + item.quantity; }, 0);
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>'"]/g, function (character) {
      return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character];
    });
  }

  function installPanels() {
    var container = document.createElement('div');
    container.innerHTML = [
      '<div class="site-panel-overlay" data-panel-overlay hidden></div>',
      '<aside class="site-drawer cart-drawer" data-panel="cart" aria-hidden="true" aria-labelledby="cart-title">',
      '  <div class="drawer-head"><h2 id="cart-title">Cart (<span data-cart-count>0</span>)</h2><button type="button" data-close-panel>Close ×</button></div>',
      '  <div class="cart-drawer-body" data-cart-items></div>',
      '  <div class="cart-drawer-footer" data-cart-footer></div>',
      '</aside>',
      '<section class="site-search" data-panel="search" aria-hidden="true" aria-labelledby="search-title">',
      '  <div class="site-search-head"><a href="index.html" class="site-search-wordmark">SOFT HOURS</a><button type="button" data-close-panel>Close ×</button></div>',
      '  <div class="site-search-query">',
      '    <label id="search-title" for="site-search">Search</label>',
      '    <div class="site-search-input"><input id="site-search" type="search" autocomplete="off" placeholder="TYPE TO SEARCH" data-search-input><button type="button" data-clear-search>Clear</button></div>',
      '  </div>',
      '  <div class="search-results" data-search-results><div class="search-prompt"><p>Begin typing to search Collection I, Journal, and support.</p></div></div>',
      '</section>'
    ].join('');
    while (container.firstChild) document.body.appendChild(container.firstChild);
  }

  function setPanel(name, open, trigger) {
    var overlay = document.querySelector('[data-panel-overlay]');
    var panels = document.querySelectorAll('[data-panel]');
    panels.forEach(function (panel) {
      panel.setAttribute('aria-hidden', panel.dataset.panel === name && open ? 'false' : 'true');
    });
    if (open) {
      lastTrigger = trigger || document.activeElement;
      overlay.hidden = false;
      document.documentElement.classList.add('panel-open');
      var active = document.querySelector('[data-panel="' + name + '"]');
      window.setTimeout(function () {
        var focusTarget = name === 'search' ? active.querySelector('[data-search-input]') : active.querySelector('input, button, a[href]');
        if (focusTarget) focusTarget.focus();
      }, 80);
    } else {
      overlay.hidden = true;
      document.documentElement.classList.remove('panel-open');
      if (lastTrigger && document.contains(lastTrigger)) lastTrigger.focus();
      lastTrigger = null;
    }
  }

  function openCart(trigger) {
    renderCart();
    setPanel('cart', true, trigger);
  }

  function renderCart() {
    var cart = readCart();
    var count = cartCount(cart);
    document.querySelectorAll('[data-cart-count]').forEach(function (node) { node.textContent = count; });
    document.querySelectorAll('[data-cart-label]').forEach(function (node) { node.textContent = 'Cart (' + count + ')'; });

    var items = document.querySelector('[data-cart-items]');
    var footer = document.querySelector('[data-cart-footer]');
    if (!items || !footer) return;

    if (!cart.length) {
      items.innerHTML = '<div class="cart-empty"><p class="drawer-eyebrow">Empty Cart</p><h3>YOUR CART IS EMPTY</h3><p>Collection I is ready when you are.</p><a href="shop.html" class="prototype-button prototype-button--dark">View Collection I</a></div>';
      footer.innerHTML = '';
      return;
    }

    items.innerHTML = cart.map(function (item, index) {
      var itemUrl = item.slug === 'gift-card' ? 'gift-card.html' : 'product.html?piece=' + encodeURIComponent(item.slug);
      var firstLabel = item.slug === 'gift-card' ? 'Delivery' : 'Colour';
      var secondLabel = item.slug === 'gift-card' ? 'Value' : 'Size';
      return [
        '<article class="cart-line" data-cart-line="' + index + '">',
        '  <a class="cart-line-image" href="' + itemUrl + '"><img src="' + escapeHtml(item.image) + '" alt=""></a>',
        '  <div class="cart-line-main">',
        '    <div class="cart-line-top"><a href="' + itemUrl + '">' + escapeHtml(item.name) + '</a><span>' + money(item.price * item.quantity) + '</span></div>',
        '    <dl><div><dt>' + firstLabel + '</dt><dd>' + escapeHtml(item.colour) + '</dd></div><div><dt>' + secondLabel + '</dt><dd>' + escapeHtml(item.size) + '</dd></div></dl>',
        '    <div class="cart-line-actions">',
        '      <div class="cart-quantity"><button type="button" data-cart-quantity="-1" data-index="' + index + '" aria-label="Decrease quantity">−</button><span>' + item.quantity + '</span><button type="button" data-cart-quantity="1" data-index="' + index + '" aria-label="Increase quantity">+</button></div>',
        '      <div class="cart-line-links"><a class="text-button" href="' + itemUrl + '">Edit</a><button type="button" class="text-button" data-cart-remove data-index="' + index + '">Remove</button></div>',
        '    </div>',
        '  </div>',
        '</article>'
      ].join('');
    }).join('');

    var subtotal = cart.reduce(function (total, item) { return total + (item.price * item.quantity); }, 0);
    footer.innerHTML = [
      '<div class="cart-subtotal"><span>Subtotal</span><strong>' + money(subtotal) + '</strong></div>',
      '<p class="cart-note">Delivery, duties, and taxes are confirmed at checkout. Final operating details are pending.</p>',
      '<div class="express-label"><span>Express checkout</span></div>',
      '<div class="express-options"><button class="apple-pay" type="button" data-checkout-demo="Apple Pay"><span aria-hidden="true">●</span> Pay</button><button class="shop-pay" type="button" data-checkout-demo="Shop Pay">Shop Pay</button></div>',
      '<div class="cart-or"><span>or</span></div>',
      '<button type="button" class="prototype-button prototype-button--dark" data-checkout-demo="Checkout">Checkout</button>',
      '<button type="button" class="text-button cart-continue" data-close-panel>Continue shopping</button>',
      '<p class="cart-availability">Express options appear only when available for the customer, device, and market.</p>',
      '<p class="prototype-status" data-cart-status aria-live="polite"></p>'
    ].join('');
  }

  function addProduct(button) {
    var root = button.closest('[data-product]') || document;
    var selectedSize = root.querySelector('[data-size][aria-pressed="true"]');
    var selectedColour = root.querySelector('[data-colour][aria-pressed="true"]');
    var status = root.querySelector('[data-product-status]');
    if (!selectedSize) {
      if (status) {
        status.textContent = 'Please select a size before adding to Cart.';
        status.dataset.state = 'error';
      }
      root.querySelector('[data-size]')?.focus();
      return;
    }
    if (button.dataset.forceError === 'true') {
      if (status) {
        status.textContent = 'Something went wrong. Your selection has not been lost. Please try again.';
        status.dataset.state = 'error';
      }
      return;
    }
    var item = {
      slug: button.dataset.slug || 'shirt',
      name: button.dataset.name || 'Shirt',
      price: Number(button.dataset.price || 230),
      image: button.dataset.image || 'assets/paper/01KV6816HE9450H72167DYES51.png',
      colour: selectedColour ? selectedColour.dataset.colour : 'Bone',
      size: selectedSize.dataset.size,
      quantity: 1
    };
    var originalLabel = button.textContent;
    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    button.textContent = 'Adding your piece…';
    if (status) {
      status.textContent = 'Preserving your selected colour and size.';
      status.dataset.state = 'loading';
    }
    window.setTimeout(function () {
      var cart = readCart();
      var existing = cart.find(function (entry) { return entry.slug === item.slug && entry.colour === item.colour && entry.size === item.size; });
      if (existing) existing.quantity += 1;
      else cart.push(item);
      writeCart(cart);
      button.disabled = false;
      button.removeAttribute('aria-busy');
      button.textContent = originalLabel;
      if (status) {
        status.textContent = 'Added to Cart.';
        status.dataset.state = 'success';
      }
      openCart(button);
    }, 420);
  }

  function addGiftCard(form) {
    var amountButton = form.querySelector('[data-amount][aria-pressed="true"]');
    var amount = Number(amountButton ? amountButton.dataset.amount : 50);
    var cart = readCart();
    cart.push({
      slug: 'gift-card',
      name: 'Soft Hours Gift Card',
      price: amount,
      image: 'assets/paper/01KV63T6G65ZWKXMFAPFXTPT4H.png',
      colour: 'Email',
      size: money(amount),
      quantity: 1
    });
    writeCart(cart);
    var status = form.querySelector('[data-form-status]');
    if (status) status.textContent = 'Added to Cart.';
    openCart(form.querySelector('button[type="submit"]'));
  }

  function updateSearch(term) {
    var target = document.querySelector('[data-search-results]');
    if (!target) return;
    var query = term.trim().toLowerCase();
    if (query.length < 2) {
      target.innerHTML = '<div class="search-prompt"><p>Begin typing to search Collection I, Journal, and support.</p></div>';
      return;
    }
    var matches = searchIndex.filter(function (item) { return (item.title + ' ' + item.type + ' ' + (item.keywords || '')).toLowerCase().includes(query); });
    var productMatches = matches.filter(function (item) { return item.type === 'Product'; }).slice(0, 3);
    if (productMatches.length) {
      target.innerHTML = [
        '<div class="search-result-meta"><span>' + productMatches.length + ' results</span><span>Press Enter to view all</span></div>',
        '<div class="search-result-grid">',
        productMatches.map(function (item) {
          return '<a class="search-result-card" href="' + item.url + '"><span class="search-result-image"><img src="' + item.image + '" alt=""></span><span class="search-result-line"><strong>' + item.title + '</strong><span>' + money(item.price) + '</span></span></a>';
        }).join(''),
        '</div>'
      ].join('');
      return;
    }
    if (matches.length) {
      target.innerHTML = '<div class="search-result-meta"><span>' + matches.length + ' results</span></div><div class="search-page-results">' + matches.map(function (item) { return '<a href="' + item.url + '"><span>' + item.type + '</span><strong>' + item.title + '</strong><span>View →</span></a>'; }).join('') + '</div>';
      return;
    }
    target.innerHTML = '<div class="search-empty"><p class="drawer-eyebrow">No search results</p><h3>NOTHING FOUND</h3><p>Try a different term or return to Collection I.</p><a href="shop.html">View Collection I</a></div>';
  }

  function updateCollection() {
    var grid = document.querySelector('[data-collection-grid]');
    if (!grid) return;
    var colour = document.querySelector('[data-collection-filter="colour"]')?.value || 'all';
    var size = document.querySelector('[data-collection-filter="size"]')?.value || 'all';
    var sort = document.querySelector('[data-collection-sort]')?.value || 'featured';
    var cards = Array.from(grid.querySelectorAll('[data-product-card]'));
    cards.forEach(function (card) {
      var colourMatch = colour === 'all' || card.dataset.colours.split(' ').includes(colour);
      var sizeMatch = size === 'all' || card.dataset.sizes.split(' ').includes(size);
      card.hidden = !(colourMatch && sizeMatch);
    });
    if (sort !== 'featured') {
      cards.sort(function (a, b) {
        if (sort === 'name') return a.dataset.name.localeCompare(b.dataset.name);
        var difference = Number(a.dataset.price) - Number(b.dataset.price);
        return sort === 'price-high' ? -difference : difference;
      }).forEach(function (card) { grid.appendChild(card); });
    }
    var visible = cards.filter(function (card) { return !card.hidden; }).length;
    var status = document.querySelector('[data-collection-status]');
    if (status) status.textContent = visible + ' pieces shown.';
  }

  function setupMobileMenu() {
    var burger = document.querySelector('.nav-burger');
    var menu = document.querySelector('.mobile-menu');
    if (!burger || !menu) return;
    function setOpen(open) {
      menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    }
    burger.addEventListener('click', function () { setOpen(!menu.classList.contains('is-open')); });
    menu.querySelector('.mobile-menu-close')?.addEventListener('click', function () { setOpen(false); });
    menu.querySelectorAll('a, button').forEach(function (link) {
      if (!link.classList.contains('mobile-menu-close')) link.addEventListener('click', function () { setOpen(false); });
    });
  }

  function installGlobalShell() {
    var navLinks = document.querySelector('.nav-links');
    var navRight = document.querySelector('.nav-right');
    var mobileMenu = document.querySelector('.mobile-menu');
    if (navLinks) navLinks.innerHTML = '<a href="shop.html">Collection I</a><a href="journal.html">Journal</a><a href="about.html">About</a>';
    if (navRight) navRight.innerHTML = '<button class="nav-action" type="button" data-open-search>Search</button><a class="nav-action" href="account.html">Account</a><button class="nav-action" type="button" data-open-cart data-cart-label>Cart (0)</button>';
    if (mobileMenu) {
      mobileMenu.innerHTML = [
        '<div class="mobile-menu-head"><span>SOFT HOURS</span><button class="mobile-menu-close" type="button" aria-label="Close menu">Close ×</button></div>',
        '<nav class="mobile-menu-links"><a href="shop.html">Collection I</a><a href="journal.html">Journal</a><a href="about.html">About</a></nav>',
        '<div class="mobile-menu-meta"><button type="button" data-open-search>Search</button><a href="account.html">Account</a><button type="button" data-open-cart data-cart-label>Cart (0)</button></div>'
      ].join('');
    }

    var footer = document.querySelector('.footer');
    if (footer) footer.innerHTML = [
      '<div class="footer-top"><div class="footer-cols">',
      '  <div class="footer-col"><h4>Shop</h4><ul><li><a href="shop.html">Collection I</a></li><li><a href="gift-card.html">Gift Card</a></li><li><a href="size-guide.html">Size Guide</a></li></ul></div>',
      '  <div class="footer-col"><h4>Soft Hours</h4><ul><li><a href="about.html">About</a></li><li><a href="journal.html">Journal</a></li><li><a href="index.html#newsletter">Newsletter</a></li><li><a href="support.html#contact">Contact</a></li></ul></div>',
      '  <div class="footer-col"><h4>Help</h4><ul><li><a href="support.html#faq">FAQ</a></li><li><a href="support.html#delivery">Delivery &amp; Returns</a></li><li><a href="support.html#privacy">Privacy</a></li><li><a href="support.html#terms">Terms</a></li></ul></div>',
      '  <div class="footer-col"><h4>Follow</h4><ul><li><a href="https://www.instagram.com/softhours/" target="_blank" rel="noreferrer">Instagram · @softhours</a></li></ul></div>',
      '</div></div>',
      '<div class="footer-wordmark-band"><div class="footer-wordmark" role="img" aria-label="Soft Hours"></div></div>',
      '<div class="footer-bottom"><span>© Soft Hours · MMXXVI</span><div class="footer-meta"><span>EN</span><span class="divider"></span><span>EUR · CHF · GBP</span><span class="divider"></span><span>Delivery details pending</span></div><span><a href="support.html#privacy">Privacy</a> · <a href="support.html#terms">Terms</a></span></div>'
    ].join('');
  }

  function hydrateProductPage() {
    var root = document.querySelector('[data-product]');
    if (!root) return;
    var params = new URLSearchParams(window.location.search);
    var slug = params.get('piece') || 'shirt';
    var state = params.get('state') || '';
    var product = productCatalog[slug] || productCatalog.shirt;
    document.title = 'Soft Hours — ' + product.name;
    root.querySelectorAll('[data-product-name]').forEach(function (node) { node.textContent = product.name; });
    root.querySelectorAll('[data-product-name-uppercase]').forEach(function (node) { node.textContent = product.name.toUpperCase(); });
    root.querySelectorAll('[data-product-price]').forEach(function (node) { node.textContent = money(product.price); });
    root.querySelectorAll('[data-product-description]').forEach(function (node) { node.textContent = product.description; });
    var main = root.querySelector('[data-gallery-main]');
    if (main) main.style.backgroundImage = 'url("' + product.main + '")';
    root.querySelectorAll('[data-gallery-thumb]').forEach(function (thumb, index) {
      var source = product.images[index] || product.main;
      thumb.dataset.galleryThumb = source;
      thumb.style.backgroundImage = 'url("' + source + '")';
    });
    var add = root.querySelector('[data-add-to-cart]');
    if (add) {
      add.dataset.slug = slug;
      add.dataset.name = product.name;
      add.dataset.price = product.price;
      add.dataset.image = product.main;
      add.textContent = 'Add to Cart — ' + money(product.price);
      if (state === 'sold-out') {
        add.removeAttribute('data-add-to-cart');
        add.setAttribute('data-notify-me', '');
        add.textContent = 'Notify me';
        root.querySelector('[data-sold-out-label]')?.removeAttribute('hidden');
      }
      if (state === 'error') add.dataset.forceError = 'true';
    }
  }

  function setSupportPanel(name) {
    var tabs = document.querySelectorAll('[data-support-tab]');
    var panels = document.querySelectorAll('[data-support-panel]');
    if (!tabs.length || !panels.length) return;
    var valid = Array.from(panels).some(function (panel) { return panel.dataset.supportPanel === name; });
    var activeName = valid ? name : 'faq';
    tabs.forEach(function (tab) {
      var active = tab.dataset.supportTab === activeName;
      tab.setAttribute('aria-selected', active ? 'true' : 'false');
      tab.classList.toggle('active', active);
    });
    panels.forEach(function (panel) { panel.hidden = panel.dataset.supportPanel !== activeName; });
  }

  function setupSupportPage() {
    if (!document.querySelector('[data-support-panel]')) return;
    setSupportPanel(window.location.hash.replace('#', '') || 'faq');
  }

  function setupReveals() {
    if (!document.documentElement.classList.contains('js-reveal')) return;
    var elements = document.querySelectorAll('[data-reveal], .home-hero-text, .home-hero-cta, .home-intro-title, .home-intro-body, .home-duo-item, .home-edit-label, .home-edit-title, .home-arrivals-title, .home-arrival, .home-firsthour-title, .home-firsthour-emblem, .home-firsthour-body, .home-journal-eyebrow, .home-journal-title, .home-journal-sub, .home-world, .home-email-mark, .home-email-title, .home-email-sub, .home-email-form, .shop-eyebrow, .shop-title, .shop-intro, .shop-card, .pdp-gallery, .pdp-info');
    if (!('IntersectionObserver' in window)) { elements.forEach(function (element) { element.classList.add('is-visible'); }); return; }
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    elements.forEach(function (element) { observer.observe(element); });
  }

  installGlobalShell();
  hydrateProductPage();
  installPanels();
  setupMobileMenu();
  renderCart();
  setupSupportPage();
  setupReveals();

  document.addEventListener('click', function (event) {
    var cartTrigger = event.target.closest('[data-open-cart], .js-cart-link');
    var searchTrigger = event.target.closest('[data-open-search], .js-search-link');
    if (cartTrigger) { event.preventDefault(); openCart(cartTrigger); return; }
    if (searchTrigger) { event.preventDefault(); setPanel('search', true, searchTrigger); return; }
    if (event.target.closest('[data-close-panel]') || event.target.matches('[data-panel-overlay]')) { setPanel('', false); return; }

    var clearSearch = event.target.closest('[data-clear-search]');
    if (clearSearch) {
      var searchInput = document.querySelector('[data-search-input]');
      searchInput.value = '';
      updateSearch('');
      searchInput.focus();
      return;
    }

    var notifyTrigger = event.target.closest('[data-notify-me]');
    if (notifyTrigger) {
      var notifyForm = notifyTrigger.closest('[data-product]').querySelector('[data-notify-form]');
      notifyForm.hidden = false;
      notifyForm.querySelector('input').focus();
      return;
    }

    var supportTab = event.target.closest('[data-support-tab]');
    if (supportTab) {
      event.preventDefault();
      var supportName = supportTab.dataset.supportTab;
      setSupportPanel(supportName);
      history.replaceState(null, '', '#' + supportName);
      return;
    }

    var shareArticle = event.target.closest('[data-share-article]');
    if (shareArticle) {
      var shareData = { title: document.title, url: window.location.href };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
      } else if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(function () {
          shareArticle.textContent = 'Link copied';
        });
      }
      return;
    }

    var choice = event.target.closest('[data-size], [data-colour]');
    if (choice) {
      var attribute = choice.hasAttribute('data-size') ? 'data-size' : 'data-colour';
      choice.closest('[data-product]').querySelectorAll('[' + attribute + ']').forEach(function (option) { option.setAttribute('aria-pressed', option === choice ? 'true' : 'false'); });
      var label = choice.closest('[data-product]').querySelector(attribute === 'data-size' ? '[data-size-label]' : '[data-colour-label]');
      if (label) label.textContent = choice.getAttribute(attribute);
      var productStatus = choice.closest('[data-product]').querySelector('[data-product-status]');
      if (productStatus) productStatus.textContent = '';
      return;
    }

    var add = event.target.closest('[data-add-to-cart]');
    if (add) { event.preventDefault(); addProduct(add); return; }

    var amount = event.target.closest('[data-amount]');
    if (amount) {
      var amountGroup = amount.closest('.amount-options');
      amountGroup.querySelectorAll('[data-amount]').forEach(function (option) { option.setAttribute('aria-pressed', option === amount ? 'true' : 'false'); });
      var preview = document.querySelector('[data-gift-card-preview]');
      if (preview) preview.textContent = money(amount.dataset.amount);
      return;
    }

    var quantity = event.target.closest('[data-cart-quantity]');
    if (quantity) {
      var cart = readCart();
      var index = Number(quantity.dataset.index);
      cart[index].quantity += Number(quantity.dataset.cartQuantity);
      if (cart[index].quantity <= 0) cart.splice(index, 1);
      writeCart(cart);
      return;
    }

    var remove = event.target.closest('[data-cart-remove]');
    if (remove) {
      var currentCart = readCart();
      currentCart.splice(Number(remove.dataset.index), 1);
      writeCart(currentCart);
      return;
    }

    var checkout = event.target.closest('[data-checkout-demo]');
    if (checkout) {
      var checkoutStatus = document.querySelector('[data-cart-status]');
      if (checkoutStatus) checkoutStatus.textContent = checkout.dataset.checkoutDemo + ' will connect in the unpublished Shopify theme.';
      return;
    }

    var accordion = event.target.closest('[data-accordion-button]');
    if (accordion) {
      var expanded = accordion.getAttribute('aria-expanded') === 'true';
      accordion.setAttribute('aria-expanded', expanded ? 'false' : 'true');
      var panel = document.getElementById(accordion.getAttribute('aria-controls'));
      if (panel) panel.hidden = expanded;
      accordion.querySelector('[data-accordion-icon]').textContent = expanded ? '+' : '−';
      return;
    }

    var thumb = event.target.closest('[data-gallery-thumb]');
    if (thumb) {
      var gallery = thumb.closest('[data-gallery]');
      gallery.querySelectorAll('[data-gallery-thumb]').forEach(function (item) { item.classList.toggle('active', item === thumb); });
      var main = gallery.querySelector('[data-gallery-main]');
      main.style.backgroundImage = 'url("' + thumb.dataset.galleryThumb + '")';
    }
  });

  document.addEventListener('input', function (event) {
    if (event.target.matches('[data-search-input]')) updateSearch(event.target.value);
  });

  document.addEventListener('change', function (event) {
    if (event.target.matches('[data-collection-filter], [data-collection-sort]')) updateCollection();
  });

  document.addEventListener('submit', function (event) {
    var giftCardForm = event.target.closest('[data-gift-card-form]');
    if (giftCardForm) {
      event.preventDefault();
      addGiftCard(giftCardForm);
      return;
    }
    var form = event.target.closest('[data-prototype-form], [data-newsletter-form], [data-contact-form], [data-notify-form]');
    if (!form) return;
    event.preventDefault();
    var status = form.querySelector('[data-form-status]');
    if (status) status.textContent = form.hasAttribute('data-newsletter-form') ? 'Thank you. Newsletter signup will connect in Shopify.' : form.hasAttribute('data-contact-form') ? 'Thank you. This form will connect in Shopify.' : form.hasAttribute('data-notify-form') ? 'Thank you. We will notify you when this piece returns.' : 'A secure sign-in code will be sent once customer accounts are connected.';
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setPanel('', false);
      document.querySelector('.mobile-menu')?.classList.remove('is-open');
      document.documentElement.classList.remove('menu-open');
    }
  });

  window.addEventListener('hashchange', function () {
    if (document.querySelector('[data-support-panel]')) setSupportPanel(window.location.hash.replace('#', '') || 'faq');
  });
})();
