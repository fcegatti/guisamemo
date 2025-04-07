# Style Guide for Guisamemo

This document defines the development conventions for the Guisamemo project.
It aims to ensure consistency, readability, and scalability of the codebase.
All documentation must be written in **English**, including this file.

## CSS Conventions

### Naming
- Use **BEM (Block__Element--Modifier)** for all class names.
- Use `lowercase` for CSS file names (e.g. `exitgamemodal.css`, `podium.css`).
- While we currently use lowercase names, the preferred future format is `kebab-case` (e.g. `end-screen.css`).

### Structure
- Group styles by feature, not by type.
- Keep all related styles in the same file (e.g. `podium.css` for all podium-related styles).
- Avoid duplicate or unused selectors.

### Animations
- Define keyframes where needed. Reuse them if possible.
- Use `transition` for element state changes (e.g. hover, active, visible).
- Use `@keyframes` only when required for complex transitions.
- Avoid `!important`. If absolutely necessary, include a comment to explain why.

### Z-Index Management
- Use `z-index` only when necessary.
- Assign z-index in logical groups:
  - `10` → interactive UI elements like podium
  - `50` → overlays
  - `100` → modals
- Avoid arbitrary high values like `999` unless absolutely required.

## Component Structure

- Keep components small and focused (SRP: Single Responsibility Principle).
- Use `absolute` or `fixed` positioning only when necessary.
- Use `flexbox` for layout unless a specific exception arises.

## Import Paths

- Always use `@styles/...` for importing styles.
- Do **not** mix relative and alias-based imports in the same file.
- All styles are centralized in `src/styles/index.css`.

## General Rules

- Development language: **English**
- Interface language: **Spanish**
- Comments: English only
- Do not leave console logs or commented-out code in committed files
- Avoid magic numbers and comment any hardcoded values if needed

## Context Testing Best Practices

- When testing components that use context (like GameContext), wrap them in a provider with test data.
- Do not modify the core context for testing purposes.
- Instead, pass mock values using the initialPlayers prop of the GameProvider:

```
const mockPlayers = [
  { id: 'p1', name: 'Test A', score: 40, avatar: 'avatar-1.webp' },
  { id: 'p2', name: 'Test B', score: 30, avatar: 'avatar-2.webp' }
]

<GameProvider initialPlayers={mockPlayers}>
  <EndScreen />
</GameProvider>

```

## Public Assets

### Card Images
- Todas las cartas del juego se ubican en /public/cards/.
- Se deben nombrar siguiendo el patrón: card-1.webp, card-2.webp, ..., hasta card-15.webp.
- Las cartas especiales (como Maradona y Messi) también siguen la misma convención, pero se documenta internamente qué número corresponde a cuál.
- Las imágenes deben tener resolución homogénea y fondo #f9f9f9 para consistencia visual.
- Al reemplazar imágenes, se debe mantener el mismo nombre de archivo para evitar conflictos de rutas.

### Avatar Images
- Los avatares se ubican en /public/avatars/.
- Se nombran como: avatar-1.webp, avatar-2.webp, ..., hasta avatar-15.webp.
- Cada avatar debe corresponder visualmente a una de las cartas para mantener coherencia 1:1.
- Las imágenes deben tener marco circular adecuado (rostro centrado, sin recortes).
- Si el avatar no está disponible, se usa avatar-default.webp.

---
This file should be updated alongside any significant decision to ensure alignment between contributors.

