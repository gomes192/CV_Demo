import { PeopleCounter } from "../components/PeopleCounter";

export default function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-6 sm:px-6 lg:px-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
        <header className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-slate-400">
              Computer Vision Demo
            </p>
            <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-50 sm:text-3xl">
              Real‑time Room People Counter
            </h1>
          </div>
          <p className="max-w-md text-xs text-slate-400 sm:text-sm">
            Open this site on any device with a camera, grant access, and see
            how many people are detected in real time. Optimized for modern
            desktop and mobile browsers.
          </p>
        </header>

        <PeopleCounter />

        <footer className="mt-2 flex items-center justify-between text-[0.7rem] text-slate-500">
          <span>Built with Next.js, Tailwind CSS &amp; TensorFlow.js.</span>
          <span>Ready to deploy on Vercel.</span>
        </footer>
      </div>
    </main>
  );
}

