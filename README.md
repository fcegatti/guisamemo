# Guisamemo

**Guisamemo** is a playful, mobile-friendly memory game (Memorama-style), designed especially for kids. Play solo or with up to 4 players in a turn-based challenge where each correct pair scores points—and a few surprise cards score double!

![Guisamemo logo](./logo.webp)

---

## 🧩 About the Game

Guisamemo is a progressive web app (PWA) where players take turns flipping cards in search of matching pairs. It's inspired by classic memory games but adapted with vibrant custom art, animations, and a friendly UI optimized for tablets and mobile devices.

The project’s name is a tribute to **Guísamo**, a small village in Galicia, Spain—and to three very special people: **Roque, Telmo and Román**.

---

## ✨ Features

- 🎨 Custom card artwork with special scoring for rare pairs  
- 📱 Mobile-first layout with responsive support for tablets and desktops  
- 🧑‍🤝‍🧑 Multiplayer (1–4 players) with turn logic  
- 🏆 Animated end screen and score display  
- 🔊 Support for future sound effects and animations  
- 🕹️ Progressive Web App (PWA): installable on Android, iOS, desktop  
- ♿ Accessibility and semantic HTML (ongoing)

---

## 📌 MVP Highlights (v1.0.0)

- Responsive layout for 6 board sizes (XS–3XL)  
- Game loop with scoring and turn skipping on error  
- Animated game over screen (1-player or multiplayer podium)  
- Avatar selection per player  
- Game engine hook (`useGameEngine`) and global context  
- PWA support with Service Worker and offline fallback  
- SEO optimizations and rich snippets (JSON-LD)

---

## 🗺️ Roadmap (Post-MVP)

- Sound effects and visual feedback on match/mismatch  
- Configurable time limit per turn  
- Ranking or history of games played  
- Localization: Galician and other languages  
- Accessibility enhancements  
- Card sharing and social game invites  

---

## 🔧 Installation (Development)

```bash
git clone https://github.com/fcegatti/guisamemo.git
cd guisamemo
npm install
npm run dev
```

To test the PWA:

```bash
npm run build
npm run preview
```

---

## 🧑‍⚖️ License

This project is licensed under the MIT License.

> You are free to use, modify and distribute this project with attribution.  
> If you plan to use it commercially or as a base for a similar product, please consider the intent behind the project and the creator's plans for a commercial version.

---

## 👤 Credits

No external assets currently require attribution.  
Credits will be included when used in future versions.

---

## ❤️ Final Words

Guisamemo is a tribute to the joy of childhood and the people we love.  
**Created for Roque, Telmo and Román.**
