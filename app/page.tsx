import { PeopleCounter } from "../components/PeopleCounter";

export default function HomePage() {
  return (
    <main className="flex h-dvh flex-col">
      <div className="flex flex-1 flex-col min-h-0">
        <PeopleCounter />
      </div>
      <footer className="flex-shrink-0 border-t border-slate-800/60 px-3 py-2 text-center text-[0.65rem] text-slate-500">
        Visão computacional no navegador · Next.js, Tailwind, TensorFlow.js
      </footer>
    </main>
  );
}
