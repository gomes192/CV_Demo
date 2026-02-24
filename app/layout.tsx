import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Contador de Pessoas - Demo de Visão Computacional",
  description:
    "Demo de visão computacional na web: conte quantas pessoas estão no ambiente usando a câmera do dispositivo.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        {children}
      </body>
    </html>
  );
}

