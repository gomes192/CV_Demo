# Room People Counter – Computer Vision Demo

This is a small, production-ready web app that uses your device camera and a TensorFlow.js model to estimate **how many people are in the room** in real time.

Built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, and **TensorFlow.js COCO-SSD**, and ready to deploy on **Vercel**.

## Running locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000` in your browser and grant camera access.

## Deploying to Vercel

1. Push this folder to a Git repository (GitHub, GitLab, etc.).
2. In Vercel, click **New Project** and import the repo.
3. Vercel should auto-detect:
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. Deploy. Once live, open the site on a device with a camera (HTTPS required for camera access).

