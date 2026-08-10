import '../lib/browser-window.js';

const url = window.location.href;
const isLocalhost = url.includes('127.0.0.1') || url.includes('localhost');
const componentUrl = isLocalhost ? '../../dist/theme-toggle.js' : '../lib/theme-toggle.js';

const { ThemeToggle } = await import(componentUrl);
ThemeToggle.define();

const demo = document.getElementById('demo');
const form = document.getElementById('demo-controls');
const output = document.getElementById('size-value');
const themeToggles = demo.querySelectorAll('theme-toggle');

themeToggles.forEach(el => {
  el.setAttribute('storage-key', window.__THEME_TOGGLE_DEMO_STORAGE_KEY__);
});

form.addEventListener('input', evt => {
  const input = evt.target;

  if (!(input instanceof HTMLInputElement)) {
    return;
  }

  if (input.name === 'theme-toggle-theme' && input.type === 'radio') {
    demo.dataset.themeToggleTheme = input.value;
    return;
  }

  if (input.name === 'size-control' && input.type === 'range') {
    const value = input.valueAsNumber;
    const min = Number(input.min);
    const max = Number(input.max);
    const progress = (value - min) / (max - min);
    const scale = 1 + progress;

    output.value = `${Math.round(scale * 100)}%`;

    themeToggles.forEach(el => {
      el.style.setProperty('--theme-toggle-size', `${2.5 * scale}rem`);
      el.style.setProperty('--theme-toggle-icon-size', `${1.25 * scale}rem`);
    });
  }

  if (input.name === 'disable-control' && input.type === 'checkbox') {
    themeToggles.forEach(el => (el.disabled = input.checked));
  }
});
