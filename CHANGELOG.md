# 📦 Changelog

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
