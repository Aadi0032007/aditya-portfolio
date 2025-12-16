# Aditya Raj — Computational Universe Portfolio

Immersive 3D portfolio built with Next.js 14 (App Router), React Three Fiber, GLSL shaders, and physics to reflect Aditya Raj's work across AI, robotics, and physics.

## Stack
- Next.js 14 + TypeScript + App Router
- Tailwind CSS + Framer Motion for UI motion
- React Three Fiber + Drei abstractions
- Rapier physics + React Spring + Maath utilities
- Custom shader-driven Tensor Field, IK robotic arm, Lorenz attractor, and skill cloud

## Prerequisites
- Node.js **18.18+** (recommended: the active LTS release)
- npm **9+**

## Running locally
1. Install dependencies (requires internet access to the npm registry):
   ```bash
   npm install
   ```
2. Start the development server with hot reload:
   ```bash
   npm run dev
   ```
3. Open the app at **http://localhost:3000**.

## Production build
To verify the site builds correctly and to run a production server locally:
```bash
npm run build
npm run start
```

## Testing
Run ESLint to check for lint issues:
```bash
npm run lint
```
