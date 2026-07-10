/* Mobile menu — burger toggles the full-screen overlay */
(function () {
  var burger = document.querySelector('.nav-burger');
  var menu = document.querySelector('.mobile-menu');
  if (!burger || !menu) return;
  function setOpen(open) {
    menu.classList.toggle('is-open', open);
    document.documentElement.classList.toggle('menu-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  burger.addEventListener('click', function () {
    setOpen(!menu.classList.contains('is-open'));
  });
  var close = menu.querySelector('.mobile-menu-close');
  if (close) close.addEventListener('click', function () { setOpen(false); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') setOpen(false);
  });
})();
