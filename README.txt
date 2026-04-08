ffmpeg -ss 00:00:10 -to 00:01:20 -i input.mp4 -c:v libx264 -c:a aac output.mp4
ffmpeg -i input.mp4 -vf "crop=1280:720:320:180" output.mp4
AnimeJS Animation Demo
========================

A Vue 3 + AnimeJS animation showcase project.

Tech Stack
----------
- Vue 3 (Composition API)
- Vue Router
- Pinia
- Vite
- Web Animations API

Features
--------
- Basic animations (fade, slide, zoom, rotate, bounce, shake, pulse)
- Real-time parameter control
- Advanced animations (sequence, stagger, path, combo)
- Multi-language support (Chinese/English)
- Light/Dark theme switch

Quick Start
-----------
1. Install dependencies:
   npm install

2. Run dev server:
   npm run dev

3. Open browser:
   http://localhost:3000/

Build
-----
npm run build

Project Structure
-----------------
src/
  components/    # Navigation, LanguageToggle
  pages/         # Home, BasicAnimations, ParameterControl, AdvancedAnimations
  stores/        # animation.js, language.js
  utils/         # animal.js
  router/        # index.js
