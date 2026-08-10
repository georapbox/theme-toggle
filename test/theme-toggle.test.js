import { expect, fixture, fixtureCleanup, html, oneEvent } from '@open-wc/testing';
import { ThemeToggle } from '../src/theme-toggle.js';

ThemeToggle.define();

const DEFAULT_STORAGE_KEY = 'theme-toggle/theme-preference';

describe('theme-toggle', () => {
  let prefersDark;
  let mediaQueryList;
  const originalMatchMedia = window.matchMedia;

  beforeEach(() => {
    prefersDark = false;

    const mediaQueryTarget = new EventTarget();

    mediaQueryList = {
      media: '(prefers-color-scheme: dark)',
      onchange: null,
      get matches() {
        return prefersDark;
      },
      addEventListener: (...args) => mediaQueryTarget.addEventListener(...args),
      removeEventListener: (...args) => mediaQueryTarget.removeEventListener(...args),
      dispatchEvent: event => mediaQueryTarget.dispatchEvent(event)
    };

    window.matchMedia = () => mediaQueryList;

    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  afterEach(() => {
    fixtureCleanup();

    window.matchMedia = originalMatchMedia;

    window.localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  describe('accessibility', () => {
    it('passes accessibility test', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      await expect(el).to.be.accessible();
    });
  });

  describe('attributes - properties', () => {
    describe('noStorage', () => {
      it('reflects attribute no-storage to property noStorage', async () => {
        const el = await fixture(html`<theme-toggle no-storage></theme-toggle>`);
        expect(el.noStorage).to.be.true;
      });

      it('reflects property noStorage to attribute no-storage', async () => {
        const el = await fixture(html`<theme-toggle></theme-toggle>`);
        el.noStorage = true;
        expect(el.hasAttribute('no-storage')).to.be.true;
        el.noStorage = false;
        expect(el.hasAttribute('no-storage')).to.be.false;
      });
    });

    describe('storageKey', () => {
      it('reflects attribute storage-key to property storageKey', async () => {
        const el = await fixture(html`<theme-toggle storage-key="STORAGE_KEY"></theme-toggle>`);
        expect(el.storageKey).to.equal('STORAGE_KEY');
      });

      it('reflects property storageKey to attribute storage-key', async () => {
        const el = await fixture(html`<theme-toggle></theme-toggle>`);
        el.storageKey = 'STORAGE_KEY';
        expect(el.getAttribute('storage-key')).to.equal('STORAGE_KEY');
      });
    });

    describe('lightLabel', () => {
      it('reflects attribute light-label to property lightLabel', async () => {
        const el = await fixture(html`<theme-toggle light-label="LIGHT"></theme-toggle>`);
        expect(el.lightLabel).to.equal('LIGHT');
      });

      it('reflects property lightLabel to attribute light-label', async () => {
        const el = await fixture(html`<theme-toggle></theme-toggle>`);
        el.lightLabel = 'LIGHT';
        expect(el.getAttribute('light-label')).to.equal('LIGHT');
      });
    });

    describe('darkLabel', () => {
      it('reflects attribute dark-label to property darkLabel', async () => {
        const el = await fixture(html`<theme-toggle dark-label="DARK"></theme-toggle>`);
        expect(el.darkLabel).to.equal('DARK');
      });

      it('reflects property darkLabel to attribute dark-label', async () => {
        const el = await fixture(html`<theme-toggle></theme-toggle>`);
        el.darkLabel = 'DARK';
        expect(el.getAttribute('dark-label')).to.equal('DARK');
      });
    });

    describe('disabled', () => {
      it('reflects attribute disabled to property disabled', async () => {
        const el = await fixture(html`<theme-toggle disabled></theme-toggle>`);
        expect(el.disabled).to.be.true;
      });

      it('reflects property disabled to attribute disabled', async () => {
        const el = await fixture(html`<theme-toggle></theme-toggle>`);
        el.disabled = true;
        expect(el.hasAttribute('disabled')).to.be.true;
        el.disabled = false;
        expect(el.hasAttribute('disabled')).to.be.false;
      });
    });
  });

  describe('slots', () => {
    // Light
    it('has "icon-light" slot', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const slot = el.shadowRoot.querySelector('slot[name="icon-light"]');
      expect(slot).to.exist;
    });

    it('overrides "icon-light" slot content', async () => {
      const el = await fixture(html`
        <theme-toggle>
          <span slot="icon-light">LIGHT</span>
        </theme-toggle>
      `);
      const slot = el.shadowRoot.querySelector('slot[name="icon-light"]');
      expect(slot.assignedNodes()[0].textContent).to.equal('LIGHT');
    });

    // Dark
    it('has "icon-dark" slot', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const slot = el.shadowRoot.querySelector('slot[name="icon-dark"]');
      expect(slot).to.exist;
    });

    it('overrides "icon-dark" slot content', async () => {
      const el = await fixture(html`
        <theme-toggle>
          <span slot="icon-dark">DARK</span>
        </theme-toggle>
      `);
      const slot = el.shadowRoot.querySelector('slot[name="icon-dark"]');
      expect(slot.assignedNodes()[0].textContent).to.equal('DARK');
    });
  });

  describe('CSS Parts', () => {
    it('should have base part', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');
      expect(baseElement.part.contains('base')).to.be.true;
    });

    it('each icon should have a part', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const lightIcon = el.shadowRoot.querySelector('.theme-toggle__icon--light');
      const darkIcon = el.shadowRoot.querySelector('.theme-toggle__icon--dark');

      expect(lightIcon.part.contains('icon')).to.be.true;
      expect(lightIcon.part.contains('icon--light')).to.be.true;
      expect(darkIcon.part.contains('icon')).to.be.true;
      expect(darkIcon.part.contains('icon--dark')).to.be.true;
    });
  });

  describe('events', () => {
    it('"theme-change" event is fired when clicking the toggle button', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');

      const listener1 = oneEvent(el, 'theme-change');
      baseElement.click(); // dark
      expect((await listener1).detail).to.deep.equal({
        theme: 'dark',
        resolvedTheme: 'dark'
      });

      const listener2 = oneEvent(el, 'theme-change');
      baseElement.click(); // back to system (light)
      expect((await listener2).detail).to.deep.equal({
        theme: 'system',
        resolvedTheme: 'light'
      });
    });
  });

  describe('basic functionality', () => {
    it("changes the button's icon visibility and accessible label on click", async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');
      const lightIconSlot = el.shadowRoot.querySelector('slot[name="icon-light"]');
      const darkIconSlot = el.shadowRoot.querySelector('slot[name="icon-dark"]');

      // system resolves to light
      expect(lightIconSlot.classList.contains('hidden')).to.be.false;
      expect(darkIconSlot.classList.contains('hidden')).to.be.true;
      expect(baseElement.getAttribute('aria-label')).to.equal('Switch to dark theme');

      baseElement.click(); // dark
      expect(lightIconSlot.classList.contains('hidden')).to.be.true;
      expect(darkIconSlot.classList.contains('hidden')).to.be.false;
      expect(baseElement.getAttribute('aria-label')).to.equal('Switch to light theme');

      baseElement.click(); // back to system (light)
      expect(lightIconSlot.classList.contains('hidden')).to.be.false;
      expect(darkIconSlot.classList.contains('hidden')).to.be.true;
      expect(baseElement.getAttribute('aria-label')).to.equal('Switch to dark theme');
    });

    it('adds "data-theme" attribute to root element of document', async () => {
      await fixture(html`<theme-toggle></theme-toggle>`);
      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
    });

    it('"data-theme" attribute on root element changes when clicking the toggle button', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');

      baseElement.click(); // dark
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');

      baseElement.click(); // back to system (light)
      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
    });

    it('persists an explicit theme preference in local storage', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');

      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).to.be.null;

      baseElement.click(); // dark
      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).to.equal('dark');

      baseElement.click(); // back to system (light)
      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).to.be.null;
    });

    it('does not persist the theme when "no-storage" is enabled', async () => {
      const el = await fixture(html`<theme-toggle no-storage></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');

      baseElement.click(); // dark
      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).to.be.null;

      baseElement.click(); // back to system (light)
      expect(window.localStorage.getItem(DEFAULT_STORAGE_KEY)).to.be.null;
    });

    it('follows system theme changes when using the system preference', async () => {
      const el = await fixture(html`<theme-toggle></theme-toggle>`);
      const baseElement = el.shadowRoot.getElementById('theme-toggle');
      const lightIconSlot = el.shadowRoot.querySelector('slot[name="icon-light"]');
      const darkIconSlot = el.shadowRoot.querySelector('slot[name="icon-dark"]');

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
      expect(lightIconSlot.classList.contains('hidden')).to.be.false;
      expect(darkIconSlot.classList.contains('hidden')).to.be.true;
      expect(baseElement.getAttribute('aria-label')).to.equal('Switch to dark theme');

      prefersDark = true;
      mediaQueryList.dispatchEvent(new Event('change'));

      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
      expect(lightIconSlot.classList.contains('hidden')).to.be.true;
      expect(darkIconSlot.classList.contains('hidden')).to.be.false;
      expect(baseElement.getAttribute('aria-label')).to.equal('Switch to light theme');
    });

    it('keeps multiple instances in sync', async () => {
      const container = await fixture(html`
        <div>
          <theme-toggle></theme-toggle>
          <theme-toggle></theme-toggle>
        </div>
      `);

      const [firstToggle, secondToggle] = container.querySelectorAll('theme-toggle');

      const firstButton = firstToggle.shadowRoot.getElementById('theme-toggle');
      const secondButton = secondToggle.shadowRoot.getElementById('theme-toggle');
      const secondLightIconSlot = secondToggle.shadowRoot.querySelector('slot[name="icon-light"]');
      const secondDarkIconSlot = secondToggle.shadowRoot.querySelector('slot[name="icon-dark"]');

      firstButton.click(); // dark

      expect(secondLightIconSlot.classList.contains('hidden')).to.be.true;
      expect(secondDarkIconSlot.classList.contains('hidden')).to.be.false;
      expect(secondButton.getAttribute('aria-label')).to.equal('Switch to light theme');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('dark');

      firstButton.click(); // back to system (light)

      expect(secondLightIconSlot.classList.contains('hidden')).to.be.false;
      expect(secondDarkIconSlot.classList.contains('hidden')).to.be.true;
      expect(secondButton.getAttribute('aria-label')).to.equal('Switch to dark theme');
      expect(document.documentElement.getAttribute('data-theme')).to.equal('system');
    });
  });
});
