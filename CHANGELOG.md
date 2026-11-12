# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.0.1] - 2026-11-12

### Fixed

- Corrected the default tag name in the generated Custom Elements Manifest.

### Changed

- Updated the build process to reuse the main module in the auto-defined entry point instead of creating a separate bundle.

### Documentation

- Simplified JSDoc annotations by removing redundant attribute, property, and method declarations already handled by the Custom Elements Manifest analyzer.

## [2.0.0] - 2026-08-29

### Changed

- **BREAKING CHANGE: Default Theme Icon Behavior**: Theme icons now represent the target theme instead of the current theme. Light mode displays the dark theme icon, and dark mode displays the light theme icon.
  - **Action Required**: Set `icon-mode="current"` to preserve the previous behavior from `1.x`.

### Added

- Added the `icon-mode` attribute and `iconMode` property for controlling whether the displayed icon represents the target or current theme.

## [1.0.0] - 2026-08-11

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

[Unreleased]: https://github.com/georapbox/theme-toggle/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/georapbox/theme-toggle/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/georapbox/theme-toggle/compare/v1.0.0...v2.0.0
[1.0.0]: https://github.com/georapbox/theme-toggle/releases/tag/v1.0.0
