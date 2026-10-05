# sahidulturab.vercel.app

My personal portfolio: an interactive 3D site covering my operations career at
Shikho, my skills, and my education.

**Live:** https://sahidulturab.vercel.app

---

## Features

- **3D scene** built with React Three Fiber, with post-processing effects
- **Face tracking (optional):** the 3D core turns to follow your head through the webcam, using MediaPipe Face Landmarker. Parts of the scene also react to the mouse.
- **Interactive skill nodes:** hover a node to highlight technical, operational or data skills
- **Career timeline** of my operations roles at Shikho, from Junior Executive onward
- Scroll-driven animations (Framer Motion + GSAP), custom cursor and side-dot navigation

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **three.js**, **@react-three/fiber**, **@react-three/drei**, **@react-three/postprocessing**
- **@mediapipe/tasks-vision** for face tracking
- **Framer Motion**, **GSAP**, **Lucide** icons
- Deployed on **Vercel**

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Editing content

- Work history: `src/data/workExperience.ts`
- Skills, education and contact: `src/app/page.tsx`
- Page title and SEO: `src/app/layout.tsx`
