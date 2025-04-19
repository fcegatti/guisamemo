# 📦 Changelog

## [1.1.0] – 2025-04-20

### Added
- Multilingual support (Spanish and Galician)
- Language toggle button with flags and accessibility labels
- Route-based language selection (`/es`, `/gl`)
- Alternate hreflang tags and canonical URL for SEO
- Dynamic `<html lang="">` and localized JSON-LD
- Translation of all UI components and error messages
- Screen reader support for translated content (`aria-label`, `aria-live`, tooltips)

### Changed
- Avatar and card names now support translation keys
- Improved i18n strategy in validation handlers

### Fixed
- LocalStorage now stores selected language to persist across sessions

## [1.0.3] - 2025-04-18

### Fixed
- Ensure update banner displays correctly when service worker activates directly
- Added accessible "Reload now" button to inform users of available updates
- Prevent crash in Podium when less than 3 players (screen reader fallback fix)

## [1.0.2] - 2025-04-16

### Added
- Screen reader narration of podium winners, synchronized with podium animation
- Announced current avatar name on change using `aria-live`
- Semantic `aria-labelledby` support added to EndGameModal and ExitGameModal
- Dedicated accessible `<h1>` (visually hidden) and replaced `label` with `heading` in board size selector

### Changed
- Clarified UpdateBanner message to reflect current version availability
- Defined `width` and `height` for logo image to improve layout stability and Lighthouse performance

### Removed
- Cleaned up `console.log` and `console.error` traces from service worker registration

## [1.0.1] - 2025-04-15

### Changed
- Improved responsive scaling of game board (cards now grow without distortion)
- Adjusted vertical layout spacing in tablets and desktop
- Refactored StartScreen layout: grouped form and player list into same block
- Unified visual width of input, add button, and player list

## [1.0.0] – 2024-04-14

### 🚀 MVP Release – Guisamemo

This is the official 1.0.0 release of the Guisamemo MVP – a mobile-first memory game for children, inspired by Memorama and developed with React 18.

#### 🧩 Game Features
- 1–4 players, sequential turns with scoring system
- 6 fixed rows, columns vary dynamically with board size
- Two special cards (Messi & Maradona) with bonus points
- Circular avatars with selection and preview
- Visual player panel with turn highlight and reordering (post-MVP)
- Final podium animation for multiplayer mode
- Solo player celebration with confetti

#### 📱 Responsive Design
- Optimized for mobile, tablet, and desktop
- Tablet horizontal layout with full player view
- Adaptive board rendering with consistent spacing
- Dynamic board size selector (XS to 3XL)

#### ⚙️ Technical Foundation
- Custom game engine hook (`useGameEngine`)
- Context API for global state
- Modular file structure by responsibility
- PWA support (offline mode, installable, manifest, service worker)
- Rich snippets and SEO metadata
- Accessibility improvements (ARIA roles, labels)

#### 🧪 Testing and Debugging
- Debug views and layout inspection via mobile emulators
- Verified Google Search Console integration
- Screenshot support for app install

---

✨ This MVP is fully playable, installable, and indexable. Future versions will include audio and multiplayer over WebSockets.
