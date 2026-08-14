(() => {
  const links = [...document.querySelectorAll('.screen-link')];
  const image = document.querySelector('[data-screen-image]');
  const name = document.querySelector('[data-screen-name]');
  const device = document.querySelector('[data-screen-device]');
  const openImage = document.querySelector('[data-open-image]');
  const stage = document.querySelector('[data-viewer-stage]');
  const loading = document.querySelector('[data-loading]');
  const fitToggle = document.querySelector('[data-fit-toggle]');

  function activate(link, updateHash = true) {
    if (!link) return;
    links.forEach((item) => {
      const active = item === link;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-current', active ? 'page' : 'false');
    });
    loading.hidden = false;
    name.textContent = link.dataset.name;
    device.textContent = link.dataset.device;
    image.dataset.mobile = String(link.dataset.device.startsWith('Mobile'));
    image.alt = `Soft Hours Ecommerce V2 ${link.dataset.name} ${link.dataset.device} artboard`;
    image.src = link.dataset.src;
    openImage.href = link.dataset.src;
    stage.classList.remove('is-fit');
    fitToggle.textContent = 'Fit full screen';
    if (updateHash) history.replaceState({}, '', `#${link.dataset.src.split('/').pop().replace('.webp', '')}`);
    document.querySelector('.viewer').scrollTo({ top: 0, behavior: 'smooth' });
  }

  links.forEach((link) => link.addEventListener('click', () => activate(link)));
  image.addEventListener('load', () => { loading.hidden = true; });
  image.addEventListener('error', () => { loading.textContent = 'This Paper export could not be loaded.'; });
  fitToggle.addEventListener('click', () => {
    const fitted = stage.classList.toggle('is-fit');
    fitToggle.textContent = fitted ? 'View at width' : 'Fit full screen';
  });

  document.addEventListener('keydown', (event) => {
    if (!['ArrowDown', 'ArrowUp'].includes(event.key) || event.target.matches('button, a, input')) return;
    const current = links.findIndex((link) => link.classList.contains('is-active'));
    const next = event.key === 'ArrowDown' ? Math.min(current + 1, links.length - 1) : Math.max(current - 1, 0);
    if (next !== current) activate(links[next]);
  });

  const hash = location.hash.slice(1);
  const initial = links.find((link) => link.dataset.src.endsWith(`${hash}.webp`)) || links[0];
  activate(initial, false);
})();
