[![npm version](https://img.shields.io/npm/v/@georapbox/theme-toggle.svg)](https://www.npmjs.com/package/@georapbox/theme-toggle)
[![npm license](https://img.shields.io/npm/l/@georapbox/theme-toggle.svg)](https://www.npmjs.com/package/@georapbox/theme-toggle)

[demo]: https://georapbox.github.io/theme-toggle/
[license]: https://github.com/georapbox/theme-toggle/blob/main/LICENSE
[changelog]: https://github.com/georapbox/theme-toggle/blob/main/CHANGELOG.md

# &lt;theme-toggle&gt;

A custom element for toggling between light and dark color themes while following the system preference by default.

[API documentation](#api) &bull; [Demo][demo]

## Usage

### Installation

```sh
npm install --save @georapbox/theme-toggle
```

### Importing the component

By default, the package exports the element class without registering it.
This lets the application decide when the custom element is defined.

#### Manual definition

```js
import { ThemeToggle } from '@georapbox/theme-toggle';

// Define using the default tag name
ThemeToggle.define();
```

#### Auto-defined (convenience)

If you don't need control over registration, you can import the pre-defined build which immediately registers `<theme-toggle>`.

```js
import '@georapbox/theme-toggle/define';
```

### Using the component in your HTML

To use the component, simply add the `<theme-toggle>` tag to your HTML:

```html
<theme-toggle></theme-toggle>
```

### Styling the component

By default, the component comes with basic styling. However, you can customise the styles of the various elements of the component using either [CSS Parts](#css-parts) or [CSS Custom Properties](#css-custom-properties).

### How it works

By default, `<theme-toggle>` uses the `system` theme and follows the user's system color preference. The system preference is resolved to either light or dark and the corresponding theme icon is displayed.

When the user toggles the theme, the component sets a `data-theme` attribute on the root element of the document:

```html
<html data-theme="light">
<html data-theme="system">
<html data-theme="dark">
```

The `system` value represents the absence of an explicit light or dark preference. In this state, the component follows the current operating system color preference.

When the user switches to a theme that differs from the system preference, that theme is saved in `localStorage` using the configured `storageKey`.

If the user switches back to the theme currently preferred by the system, the explicit preference is removed from `localStorage` and the component returns to `system`.

For example, when the system preference is light:

```
system (light) → dark → system (light)
```

If the system color preference changes while the component is using `system`, the resolved theme and displayed icon are updated automatically.

If `no-storage` is enabled, theme changes are not persisted and the component falls back to system on the next page load.

```html
<theme-toggle no-storage></theme-toggle>
```

Multiple `<theme-toggle>` instances in the same document are automatically kept in sync when the theme changes.

You can use the `data-theme` attribute to control the page color scheme and then use the CSS `light-dark()` color function for theme-aware styles:

```css
:root {
  color-scheme: light dark;
  
  --page-background-color: light-dark(#ffffff, #111111);
  --page-text-color: light-dark(#111111, #ffffff);

  background-color: var(--page-background-color);
  color: var(--page-text-color);
}

:root[data-theme='light'] {
  color-scheme: light;
}

:root[data-theme='dark'] {
  color-scheme: dark;
}

theme-toggle {
  --theme-toggle-background-color: light-dark(#f5f5f5, #262626);
  --theme-toggle-background-hover-color: light-dark(#e8e8e8, #333333);
  --theme-toggle-border-color: light-dark(#d4d4d4, #444444);
  --theme-toggle-color: light-dark(#222222, #eeeeee);
  --theme-toggle-focus-ring-color: light-dark(#2563eb, #60a5fa);
}
```

## API

### Properties

| Name | Reflects | Type | Required | Default | Description |
| ---- | -------- | ---- | -------- | ------- | ----------- |
| `noStorage`<br>*`no-storage`* | ✓ | `boolean` | - | `false` | Whether to disable persistence of the selected theme in local storage. |
| `storageKey`<br>*`storage-key`* | ✓ | `string` | - | `'theme-toggle/theme-preference'` | The local storage key used to persist the selected theme. |
| `lightLabel`<br>*`light-label`* | ✓ | `string` | - | `'Switch to light theme'` | The accessible label for switching to the light theme. |
| `darkLabel`<br>*`dark-label`* | ✓ | `string` | - | `'Switch to dark theme'` | The accessible label for switching to the dark theme. |

### Slots

| Name | Description |
| ---- | ----------- |
| `icon-light` | Custom icon for representing light mode. |
| `icon-dark` | Custom icon for representing dark mode. |

### CSS Parts

| Name | Description |
| ---- | ----------- |
| `base` | The base element of the component. |
| `icon` | The theme icon. |
| `icon--light` | The light theme icon. |
| `icon--dark` | The dark theme icon. |

### CSS Custom Properties

| Name | Description | Default |
| ---- | ----------- | ------- |
| `--theme-toggle-size` | The width and height of the toggle button. | `2.5rem` |
| `--theme-toggle-padding` | The padding of the toggle button. | `0` |
| `--theme-toggle-icon-size` | The size of the theme icon. | `1.25rem` |
| `--theme-toggle-color` | The color of the theme icon. | `#222222`, or `light-dark(#222222, #eeeeee)` when supported |
| `--theme-toggle-background-color` | The background color of the toggle button. | `#f5f5f5`, or `light-dark(#f5f5f5, #262626)` when supported |
| `--theme-toggle-background-hover-color` | The background color of the button when hovered. | `#e8e8e8`, or `light-dark(#e8e8e8, #333333)` when supported |
| `--theme-toggle-border-width` | The border width of the toggle button. | `1px` |
| `--theme-toggle-border-color` | The border color of the toggle button. | `#d4d4d4`, or `light-dark(#d4d4d4, #444444)` when supported |
| `--theme-toggle-border-radius` | The border radius of the toggle button. | `50%` |
| `--theme-toggle-focus-ring-width` | The width of the focus ring. | `2px` |
| `--theme-toggle-focus-ring-color` | The color of the focus ring. | `#2563eb`, or `light-dark(#2563eb, #60a5fa)` when supported |
| `--theme-toggle-focus-ring-offset` | The offset of the focus ring from the button. | `2px` |

> [!NOTE]
> Color defaults use static fallback values first and are enhanced with `light-dark()` in browsers that support it.

### Methods

| Name | Type | Description | Arguments |
| ---- | ---- | ----------- | --------- |
| `define` | Static | Defines the custom element by registering it with the browser's CustomElementRegistry if it hasn't been defined already. | `tagName='theme-toggle'` |

### Events

| Name | Description | Event Detail |
| ---- | ----------- | ------------ |
| `theme-change` | Dispatched when the theme is changed by user interaction. The event detail contains the theme preference and resolved theme. | `{theme: 'light' \| 'dark' \| 'system', resolvedTheme: 'light' \| 'dark'}` |

The `theme` value represents the current theme preference, while `resolvedTheme` represents the effective light or dark theme.

For example, when the component is following the system preference and the system currently prefers dark mode:

```js
{ 
  theme: 'system', 
  resolvedTheme: 'dark' 
}
```

## Changelog

For API updates and breaking changes, check the [CHANGELOG][changelog].

## Development setup

### Prerequisites

The project requires `Node.js` and `npm` to be installed on your environment. Preferrably, use [nvm](https://github.com/nvm-sh/nvm) Node Version Manager and use the version of Node.js specified in the `.nvmrc` file by running `nvm use`.

### Install dependencies

Install the project dependencies by running the following command.

```sh
npm install
```

### Build for development

Watch for changes and start a development server by running the following command.

```sh
npm start
```

### Linting

Lint the code by running the following command.

```sh
npm run lint
```

### Testing

Run the tests by running any of the following commands.

```sh
npm test
npm run test:watch # watch mode
```

### Build for production

Create a production build by running the following command.

```sh
npm run build
```

## License

[The MIT License (MIT)][license]
