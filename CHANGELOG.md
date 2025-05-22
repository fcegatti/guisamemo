# 📦 Changelog

## [1.2.0] – 2025-05-22

### Added
- Dark theme support across the entire UI, with automatic system detection and toggle
- End screen for single player mode, with personalized summary and stats
- Confetti celebration effects (lazy loaded, reduced-motion aware)
- Sound effects for match, mismatch, flip and game end using Howler.js
- Visual feedback for correct and incorrect matches (glow, overlay, vibration)
- Penalty system for incorrect pairs (-1 point, never below 0)
- Offline banner with reactive network status detection (`useNetworkStatus`)
- Orientation hint for large boards on tablets in portrait mode
- Basic 404 page with fallback UI and localization
- Landmark roles and ARIA regions (`<main>`, `<nav>`, `<section>`, `<aside>`) for accessibility
- Role-based announcements and grid semantics in Board component

### Changed
- Game logic refactored to improve modularity and maintainability:
  - `handleCardClick`, `handleMatchOutcome`, and `handleMismatchOutcome` extracted to handlers
  - `updatePlayerScore` and `resolveFlippedCards` moved to logic layer
  - Avatar name resolution centralized (`getAvatarName`)
- StartScreen refactored into smaller components: `PlayerForm`, `PlayerList`, `StartGameButton`
- All modal components now include keyboard trap and ARIA labeling
- `ThemeContext` added with smooth transitions and `theme--dark` class handling
- Translations updated with dark mode and accessibility strings
- PWA improved with `vite-plugin-pwa`: precached assets, manifest injection, offline fallback, and service worker refactor
- Layout spacing and visual flow optimized on GameScreen and EndScreen
- New `effects/` folder for animations (`Confetti`, `Fireworks`)
- GameContext now tracks player turns individually, even in single player mode

### Fixed
- Prevents Flash of Unstyled Content (FOUC) during initial dark mode load
- Improved accessible color contrast on buttons and active states
- Disabled CSS transitions and visual effects when `prefers-reduced-motion` is active
- Fixed update banner appearance under slow network conditions
- Fixed animation sync issues in EndScreen with reduced-motion preferences
- Fixed SPA routing and offline fallback via updated `vercel.json` rewrites

## [1.1.1] – 2025-04-30

### Added
- Focus trap hook (`useFocusTrap`) to prevent focus escaping from modals
- Automatic screen reader focus on modal messages (`EndGameModal`, `ExitGameModal`)
- `aria-live` announcement for revealed cards and player turn changes
- Role description `"carta"` and alt text fallback for flipped cards
- Semantic `aria-labelledby` and `aria-describedby` patterns for input validation messages
- Accessible error alerts using `role="alert"` on StartScreen

### Changed
- Prioritized URL-based language detection over `localStorage` fallback
- Removed redundant language `useEffect` logic in routing and cleaned up router component
- Added Open Graph `og:locale:alternate` tag for Galician to improve social sharing previews
- Cards are now rendered as accessible `<button>` elements
- Player avatars are no longer read by screen readers during modal prompts
- Language is now read correctly when entering from `/gl` route directly
- Board size selector now uses descriptive `aria-label` (e.g. “Tamaño L”)
- Ensure update banner appears correctly when new service worker is installed

### Fixed
- Tab navigation is now correctly restricted to modal controls
- Focus no longer escapes to background components while modal is open

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
