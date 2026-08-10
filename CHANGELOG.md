# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Initial release of the `<theme-toggle>` custom element.
- Light and dark theme toggling while following the user's system color preference by default.
- Theme preference persistence using `localStorage`, with support for disabling persistence through the `no-storage` attribute.
- Customizable storage key through the `storage-key` attribute and `storageKey` property.
- Customizable accessible labels for switching between light and dark themes.
- Custom light and dark icons through the `icon-light` and `icon-dark` slots.
- Styling customization through CSS custom properties and CSS parts.
- `theme-change` event containing the current theme preference and resolved light or dark theme.
- Automatic synchronization between multiple `<theme-toggle>` instances in the same document.
- Automatic updates when the system color preference changes while following the system theme.
