// src/app/layout.tsx
import type { Metadata } from "next";
import "./../globals.css";
import { SWRProvider } from "../providers";

export const metadata: Metadata = {
  title: "Meu App",
  description: "App com Next.js + SWR",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <SWRProvider>{children}</SWRProvider>
      </body>
    </html>
  );
}
