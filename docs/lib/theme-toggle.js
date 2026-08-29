/*!
 * @georapbox/theme-toggle
 * A custom element for toggling between light and dark color themes while following the system preference by default.
 *
 * @version 2.0.0
 * @homepage https://github.com/georapbox/theme-toggle#readme
 * @author George Raptis <georapbox@gmail.com>
 * @license MIT
 */
var n=String.raw,a=n`
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
`,g=String.raw,s=document.createElement("template");s.innerHTML=g`
  <style>
    ${a}
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
`;var r=class h extends HTMLElement{#e="system";#t=null;#r=null;constructor(){super(),this.shadowRoot||this.attachShadow({mode:"open",delegatesFocus:!0}).appendChild(s.content.cloneNode(!0))}static get observedAttributes(){return["storage-key","light-label","dark-label","icon-mode","disabled"]}attributeChangedCallback(e,t,o){t!==o&&(e==="storage-key"&&(this.#e=this.#l(),this.#s()),(e==="light-label"||e==="dark-label")&&this.#a(this.#i()),e==="icon-mode"&&this.#n(this.#i()),e==="disabled"&&this.#g())}get noStorage(){return this.hasAttribute("no-storage")}set noStorage(e){this.toggleAttribute("no-storage",!!e)}get storageKey(){return this.getAttribute("storage-key")||"theme-toggle/theme-preference"}set storageKey(e){if(e==null){this.removeAttribute("storage-key");return}this.setAttribute("storage-key",e)}get lightLabel(){return this.getAttribute("light-label")??"Switch to light theme"}set lightLabel(e){if(e==null){this.removeAttribute("light-label");return}this.setAttribute("light-label",e)}get darkLabel(){return this.getAttribute("dark-label")??"Switch to dark theme"}set darkLabel(e){if(e==null){this.removeAttribute("dark-label");return}this.setAttribute("dark-label",e)}get iconMode(){return this.getAttribute("icon-mode")==="current"?"current":"target"}set iconMode(e){if(e==null){this.removeAttribute("icon-mode");return}this.setAttribute("icon-mode",e)}get disabled(){return this.hasAttribute("disabled")}set disabled(e){this.toggleAttribute("disabled",!!e)}connectedCallback(){this.#o("noStorage"),this.#o("storageKey"),this.#o("lightLabel"),this.#o("darkLabel"),this.#o("iconMode"),this.#o("disabled"),this.#t=this.shadowRoot?.querySelector("#theme-toggle")||null,this.#r=window.matchMedia("(prefers-color-scheme: dark)"),this.#e=this.#l(),this.#s(),this.#g(),this.#t?.addEventListener("click",this.#c),this.#r.addEventListener("change",this.#m),this.ownerDocument.addEventListener("theme-change",this.#u)}disconnectedCallback(){this.#t?.removeEventListener("click",this.#c),this.#r?.removeEventListener("change",this.#m),this.ownerDocument.removeEventListener("theme-change",this.#u)}#b(e){return e==="light"||e==="dark"||e==="system"}#h(){return this.#r?.matches??window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light"}#i(){return this.#e==="system"?this.#h():this.#e}#l(){if(this.noStorage)return"system";try{let e=window.localStorage.getItem(this.storageKey);if(e==="light"||e==="dark")return e}catch{}return"system"}#f(){if(!this.noStorage)try{this.#e==="system"?window.localStorage.removeItem(this.storageKey):window.localStorage.setItem(this.storageKey,this.#e)}catch{}}#n(e){let t=this.iconMode==="target"?e==="light"?"dark":"light":e,o=this.#t?.querySelector('slot[name="icon-light"]'),i=this.#t?.querySelector('slot[name="icon-dark"]');o?.classList.toggle("hidden",t!=="light"),i?.classList.toggle("hidden",t!=="dark")}#a(e){this.#t?.setAttribute("aria-label",e==="light"?this.darkLabel:this.lightLabel)}#g(){this.#t&&(this.#t.disabled=this.disabled)}#s(){let e=this.#i();this.#n(e),this.#a(e),this.ownerDocument.documentElement.setAttribute("data-theme",this.#e)}#d(e,t={}){let{emit:o=!1,persist:i=!0}=t;return!this.#b(e)||e===this.#e?!1:(this.#e=e,i&&this.#f(),this.#s(),o&&this.#k("theme-change",{theme:this.#e,resolvedTheme:this.#i()}),!0)}#c=()=>{let e=this.#i(),t=this.#h(),o=e==="light"?"dark":"light",i=o===t?"system":o;this.#d(i,{emit:!0})};#m=()=>{this.#e==="system"&&this.#s()};#u=e=>{if(e.target===this||!(e instanceof CustomEvent))return;let t=e.detail?.theme;this.#d(t,{persist:!1})};#k(e,t,o){let i={bubbles:!0,composed:!0,cancelable:!1,...o,detail:t},l=new CustomEvent(e,i);return this.dispatchEvent(l)}#o(e){let t=this;if(Object.prototype.hasOwnProperty.call(t,e)){let o=t[e];delete t[e],t[e]=o}}static define(e="theme-toggle"){typeof window>"u"||window.customElements.get(e)||window.customElements.define(e,h)}};export{r as ThemeToggle};
