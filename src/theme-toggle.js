// @ts-check

/**
 * @typedef {'light' | 'dark'} Theme
 */

/**
 * @typedef {'light' | 'dark' | 'system'} ThemePreference
 */

/**
 * @typedef {object} ThemeChangeEventDetail
 * @property {ThemePreference} theme
 * @property {Theme} resolvedTheme
 */

const css = String.raw;

const styles = css`
  :host {
    --theme-toggle-size: 2.5rem;
    --theme-toggle-padding: 0;
    --theme-toggle-icon-size: 1.25rem;
    --theme-toggle-color: #222222;
    --theme-toggle-background-color: #f5f5f5;
    --theme-toggle-background-hover-color: #e8e8e8;
    --theme-toggle-border-width: 1px;
    --theme-toggle-border-color: #d4d4d4;
    --theme-toggle-border-radius: 50%;
    --theme-toggle-focus-ring-width: 2px;
    --theme-toggle-focus-ring-color: #2563eb;
    --theme-toggle-focus-ring-offset: 2px;

    display: inline-block;
    box-sizing: border-box;
  }

  @supports (color: light-dark(#000000, #ffffff)) {
    :host {
      --theme-toggle-color: light-dark(#222222, #eeeeee);
      --theme-toggle-background-color: light-dark(#f5f5f5, #262626);
      --theme-toggle-background-hover-color: light-dark(#e8e8e8, #333333);
      --theme-toggle-border-color: light-dark(#d4d4d4, #444444);
      --theme-toggle-focus-ring-color: light-dark(#2563eb, #60a5fa);
    }
  }

  :host *,
  :host *::after,
  :host *::before {
    box-sizing: inherit;
  }

  :host([hidden]),
  [hidden],
  ::slotted([hidden]) {
    display: none !important;
  }

  .hidden {
    display: none !important;
  }

  .theme-toggle {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    width: var(--theme-toggle-size);
    height: var(--theme-toggle-size);
    padding: var(--theme-toggle-padding);
    border: var(--theme-toggle-border-width) solid var(--theme-toggle-border-color);
    border-radius: var(--theme-toggle-border-radius);
    background-color: var(--theme-toggle-background-color);
    color: var(--theme-toggle-color);
    font-family: inherit;
    font-size: var(--theme-toggle-icon-size);
    line-height: 0;
  }

  .theme-toggle:disabled {
    opacity: 0.75;
    cursor: not-allowed;
  }

  .theme-toggle:not(:disabled) {
    cursor: pointer;
  }

  @media (hover: hover) {
    .theme-toggle:not(:disabled):hover {
      background-color: var(--theme-toggle-background-hover-color);
    }
  }

  .theme-toggle:focus-visible {
    outline: var(--theme-toggle-focus-ring-width) solid var(--theme-toggle-focus-ring-color);
    outline-offset: var(--theme-toggle-focus-ring-offset);
  }

  .theme-toggle__icon {
    width: 1em;
    height: 1em;
  }

  .theme-toggle__icon,
  .theme-toggle ::slotted(svg) {
    flex-shrink: 0;
  }
`;

const html = String.raw;
const template = document.createElement('template');

template.innerHTML = html`
  <style>
    ${styles}
  </style>

  <button type="button" part="base" id="theme-toggle" class="theme-toggle" aria-label="Switch to dark theme">
    <slot name="icon-light">
      <svg
        part="icon icon--light"
        class="theme-toggle__icon theme-toggle__icon--light"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="4"></circle>
        <path d="M12 2v2"></path>
        <path d="M12 20v2"></path>
        <path d="m4.93 4.93 1.41 1.41"></path>
        <path d="m17.66 17.66 1.41 1.41"></path>
        <path d="M2 12h2"></path>
        <path d="M20 12h2"></path>
        <path d="m6.34 17.66-1.41 1.41"></path>
        <path d="m19.07 4.93-1.41 1.41"></path>
      </svg>
    </slot>

    <slot name="icon-dark" class="hidden">
      <svg
        part="icon icon--dark"
        class="theme-toggle__icon theme-toggle__icon--dark"
        viewBox="0 0 24 24"
        width="1em"
        height="1em"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        aria-hidden="true"
      >
        <path d="M20.98 12.79A9 9 0 1 1 11.21 3.02 7 7 0 0 0 20.98 12.79z"></path>
      </svg>
    </slot>
  </button>
`;

/**
 * @summary A custom element for toggling between light and dark color themes while following the system preference by default.
 *
 * @documentation https://github.com/georapbox/theme-toggle
 *
 * @tagname theme-toggle - The default custom element tag name, unless overridden by the `define` method.
 * @extends HTMLElement
 *
 * @property {boolean} noStorage - Whether to disable persistence of the selected theme.
 * @property {string} storageKey - The local storage key used to persist the selected theme.
 * @property {string} lightLabel - The accessible label for switching to the light theme.
 * @property {string} darkLabel - The accessible label for switching to the dark theme.
 * @property {boolean} disabled - Whether the toggle button is disabled.
 *
 * @attribute {boolean} no-storage - Whether to disable persistence of the selected theme.
 * @attribute {string} storage-key - The local storage key used to persist the selected theme.
 * @attribute {string} light-label - The accessible label for switching to the light theme.
 * @attribute {string} dark-label - The accessible label for switching to the dark theme.
 * @attribute {boolean} disabled - Whether the toggle button is disabled.
 *
 * @slot icon-light - Custom icon for the light theme.
 * @slot icon-dark - Custom icon for the dark theme.
 *
 * @csspart base - The base element of the component.
 * @csspart icon - The theme icon.
 * @csspart icon--light - The light theme icon.
 * @csspart icon--dark - The dark theme icon.
 *
 * @cssproperty --theme-toggle-size - The width and height of the toggle button.
 * @cssproperty --theme-toggle-padding - The padding of the toggle button.
 * @cssproperty --theme-toggle-icon-size - The size of the theme icon.
 * @cssproperty --theme-toggle-color - The color of the theme icon.
 * @cssproperty --theme-toggle-background-color - The background color of the toggle button.
 * @cssproperty --theme-toggle-background-hover-color - The background color of the toggle button when hovered.
 * @cssproperty --theme-toggle-border-width - The border width of the toggle button.
 * @cssproperty --theme-toggle-border-color - The border color of the toggle button.
 * @cssproperty --theme-toggle-border-radius - The border radius of the toggle button.
 * @cssproperty --theme-toggle-focus-ring-width - The width of the focus ring.
 * @cssproperty --theme-toggle-focus-ring-color - The color of the focus ring.
 * @cssproperty --theme-toggle-focus-ring-offset - The offset of the focus ring from the toggle button.
 *
 * @event theme-change - Dispatched when the theme is changed by user interaction. The event detail contains the theme preference and resolved theme.
 *
 * @method define - Static method. Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already.
 */
class ThemeToggle extends HTMLElement {
  /** @type {ThemePreference} */
  #theme = 'system';

  /** @type {HTMLButtonElement | null} */
  #toggleButton = null;

  /** @type {MediaQueryList | null} */
  #colorSchemeMediaQuery = null;

  constructor() {
    super();

    if (!this.shadowRoot) {
      const shadowRoot = this.attachShadow({ mode: 'open', delegatesFocus: true });
      shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }

  static get observedAttributes() {
    return ['storage-key', 'light-label', 'dark-label', 'disabled'];
  }

  /**
   * Lifecycle method that is called when attributes are changed, added, removed, or replaced.
   *
   * @param {string} name - The name of the attribute.
   * @param {string} oldValue - The old value of the attribute.
   * @param {string} newValue - The new value of the attribute.
   */
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) {
      return;
    }

    if (name === 'storage-key') {
      this.#theme = this.#getThemePreference();
      this.#reflectThemePreference();
    }

    if (name === 'light-label' || name === 'dark-label') {
      this.#reflectThemePreference();
    }

    if (name === 'disabled') {
      this.#reflectDisabledState();
    }
  }

  /**
   * Whether to disable persistence of the selected theme in local storage.
   *
   * When enabled, theme changes are applied only for the current session and
   * are not saved for future page loads.
   *
   * @type {boolean}
   * @default false
   * @attribute no-storage
   */
  get noStorage() {
    return this.hasAttribute('no-storage');
  }

  set noStorage(value) {
    this.toggleAttribute('no-storage', !!value);
  }

  /**
   * The local storage key used to persist the selected theme.
   *
   * This value is ignored when `no-storage` is enabled.
   *
   * @type {string}
   * @default 'theme-toggle/theme-preference'
   * @attribute storage-key
   */
  get storageKey() {
    return this.getAttribute('storage-key') || 'theme-toggle/theme-preference';
  }

  set storageKey(value) {
    if (value == null) {
      this.removeAttribute('storage-key');
      return;
    }
    this.setAttribute('storage-key', value);
  }

  /**
   * The accessible label for switching to the light theme.
   *
   * @type {string}
   * @default 'Switch to light theme'
   * @attribute light-label
   */
  get lightLabel() {
    return this.getAttribute('light-label') ?? 'Switch to light theme';
  }

  set lightLabel(value) {
    if (value == null) {
      this.removeAttribute('light-label');
      return;
    }
    this.setAttribute('light-label', value);
  }

  /**
   * The accessible label for switching to the dark theme.
   *
   * @type {string}
   * @default 'Switch to dark theme'
   * @attribute dark-label
   */
  get darkLabel() {
    return this.getAttribute('dark-label') ?? 'Switch to dark theme';
  }

  set darkLabel(value) {
    if (value == null) {
      this.removeAttribute('dark-label');
      return;
    }
    this.setAttribute('dark-label', value);
  }

  /**
   * Whether the toggle button is disabled.
   *
   * @type {boolean}
   * @default false
   * @attribute disabled
   */
  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(value) {
    this.toggleAttribute('disabled', !!value);
  }

  /**
   * Lifecycle method called when the element is connected to the DOM.
   */
  connectedCallback() {
    this.#upgradeProperty('noStorage');
    this.#upgradeProperty('storageKey');
    this.#upgradeProperty('lightLabel');
    this.#upgradeProperty('darkLabel');
    this.#upgradeProperty('disabled');

    this.#toggleButton = this.shadowRoot?.querySelector('#theme-toggle') || null;

    this.#colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.#theme = this.#getThemePreference();
    this.#reflectThemePreference();
    this.#reflectDisabledState();

    this.#toggleButton?.addEventListener('click', this.#handleToggleClick);
    this.#colorSchemeMediaQuery.addEventListener('change', this.#handleMediaChange);
    this.ownerDocument.addEventListener('theme-change', this.#handleThemeChange);
  }

  /**
   * Lifecycle method called when the element is disconnected from the DOM.
   */
  disconnectedCallback() {
    this.#toggleButton?.removeEventListener('click', this.#handleToggleClick);
    this.#colorSchemeMediaQuery?.removeEventListener('change', this.#handleMediaChange);
    this.ownerDocument.removeEventListener('theme-change', this.#handleThemeChange);
  }

  /**
   * Checks whether a value is a valid theme preference.
   *
   * @param {unknown} value - The value to check.
   * @returns {value is ThemePreference} True if the value is a valid theme preference, false otherwise.
   */
  #isThemePreference(value) {
    return value === 'light' || value === 'dark' || value === 'system';
  }

  /**
   * Returns the theme currently preferred by the operating system.
   *
   * @returns {Theme} - The system preferred theme, either 'light' or 'dark'.
   */
  #getSystemTheme() {
    const prefersDark =
      this.#colorSchemeMediaQuery?.matches ?? window.matchMedia('(prefers-color-scheme: dark)').matches;

    return prefersDark ? 'dark' : 'light';
  }

  /**
   * Resolves the effective theme displayed to the user.
   *
   * @returns {Theme} - The effective theme, either 'light' or 'dark'.
   */
  #getResolvedTheme() {
    return this.#theme === 'system' ? this.#getSystemTheme() : this.#theme;
  }

  /**
   * Gets the stored theme preference.
   *
   * The absence of a stored value means that the system preference should
   * be followed.
   *
   * @returns {ThemePreference} - The stored theme preference, or 'system' if no preference is stored.
   */
  #getThemePreference() {
    if (this.noStorage) {
      return 'system';
    }

    try {
      const savedTheme = window.localStorage.getItem(this.storageKey);

      if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme;
      }
    } catch {
      // Fail silently...
    }

    return 'system';
  }

  /**
   * Persists the current preference.
   *
   * `system` is represented by removing the explicit theme override.
   */
  #setThemePreference() {
    if (this.noStorage) {
      return;
    }

    try {
      if (this.#theme === 'system') {
        window.localStorage.removeItem(this.storageKey);
      } else {
        window.localStorage.setItem(this.storageKey, this.#theme);
      }
    } catch {
      // Fail silently...
    }
  }

  /**
   * Updates the icon, accessible label, and root theme attribute.
   */
  #reflectThemePreference() {
    const resolvedTheme = this.#getResolvedTheme();

    this.#toggleButton?.querySelector('[name="icon-light"]')?.classList.toggle('hidden', resolvedTheme !== 'light');
    this.#toggleButton?.querySelector('[name="icon-dark"]')?.classList.toggle('hidden', resolvedTheme !== 'dark');
    this.#toggleButton?.setAttribute('aria-label', resolvedTheme === 'light' ? this.darkLabel : this.lightLabel);

    this.ownerDocument.documentElement.setAttribute('data-theme', this.#theme);
  }

  /**
   * Changes the theme if the value is valid and different from the current theme.
   *
   * @param {unknown} theme - The new theme to switch to.
   * @param {{emit?: boolean, persist?: boolean}} [options] - Additional options for changing the theme.
   * @return {boolean} True if the theme was changed, false if the new theme is invalid or the same as the current theme.
   */
  #changeTheme(theme, options = {}) {
    const { emit = false, persist = true } = options;

    if (!this.#isThemePreference(theme) || theme === this.#theme) {
      return false;
    }

    this.#theme = theme;

    if (persist) {
      this.#setThemePreference();
    }

    this.#reflectThemePreference();

    if (emit) {
      this.#emitEvent('theme-change', {
        theme: this.#theme,
        resolvedTheme: this.#getResolvedTheme()
      });
    }

    return true;
  }

  /**
   * Reflects the disabled state of the toggle button based on the `disabled` property.
   */
  #reflectDisabledState() {
    if (!this.#toggleButton) {
      return;
    }
    this.#toggleButton.disabled = this.disabled;
  }

  /**
   * Toggles the effective theme.
   *
   * If the new theme matches the current system preference, the explicit
   * override is removed and the component returns to following the system.
   */
  #handleToggleClick = () => {
    const currentTheme = this.#getResolvedTheme();
    const systemTheme = this.#getSystemTheme();

    /** @type {Theme} */
    const nextTheme = currentTheme === 'light' ? 'dark' : 'light';

    /** @type {ThemePreference} */
    const nextThemePreference = nextTheme === systemTheme ? 'system' : nextTheme;

    this.#changeTheme(nextThemePreference, { emit: true });
  };

  /**
   * Updates the component if the OS theme changes while the component is
   * following the system preference.
   */
  #handleMediaChange = () => {
    if (this.#theme !== 'system') {
      return;
    }
    this.#reflectThemePreference();
  };

  /**
   * Syncs this instance when another theme toggle changes the theme.
   *
   * @param {Event} evt - The theme change event object.
   */
  #handleThemeChange = evt => {
    if (evt.target === this || !(evt instanceof CustomEvent)) {
      return;
    }
    const theme = /** @type {CustomEvent<ThemeChangeEventDetail>} */ (evt).detail?.theme;
    this.#changeTheme(theme, { persist: false });
  };

  /**
   * Emit a custom event with the given name and detail.
   *
   * @template D
   * @param {string} eventName - The name of the event.
   * @param {D} [detail] - The detail payload of the event.
   * @param {CustomEventInit<D>} [init] - Override the default event initialization options.
   * @returns {boolean} - Returns false if at least one event listener called `preventDefault()`, otherwise true.
   */
  #emitEvent(eventName, detail, init) {
    const options = {
      bubbles: true,
      composed: true,
      cancelable: false,
      ...init,
      detail
    };
    const evt = new CustomEvent(eventName, options);
    return this.dispatchEvent(evt);
  }

  /**
   * Re-applies a property value that may have been set on the element
   * instance before the custom element was defined.
   *
   * This handles cases where a framework sets a property on the element
   * before its definition is loaded. Without this step, the own property
   * on the instance would shadow the class setter and prevent it from
   * running after upgrade.
   *
   * @see https://web.dev/articles/custom-elements-best-practices#make_properties_lazy
   *
   * @param {'noStorage' | 'storageKey' | 'lightLabel' | 'darkLabel' | 'disabled'} prop - The property name to upgrade.
   */
  #upgradeProperty(prop) {
    const instance = /** @type {HTMLElement & Record<string, unknown>} */ (this);

    if (Object.prototype.hasOwnProperty.call(instance, prop)) {
      const value = instance[prop];
      delete instance[prop];
      instance[prop] = value;
    }
  }

  /**
   * Defines the custom element by registering it with the browser's
   * CustomElementRegistry if it hasn't been defined already.
   *
   * @param {string} [tagName='theme-toggle'] - The tag name to use for the custom element. Must include a hyphen.
   */
  static define(tagName = 'theme-toggle') {
    if (typeof window === 'undefined' || window.customElements.get(tagName)) {
      return;
    }
    window.customElements.define(tagName, ThemeToggle);
  }
}

export { ThemeToggle };
