// app/layout.tsx
// Root layout: html, body, fonts, theme provider. No visual layout here.

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

// "variable" creates a CSS variable that globals.css uses (--font-sans).
// latin-ext includes Romanian letters: ă, â, î, ș, ț
const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
});

// Monospace for things like codes or IDs later. Merriweather (serif) skipped: we don't need it.
const fontMono = JetBrains_Mono({
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Instruo",
  description: "Fișe de instruire SSM digitale pentru consultanți",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // suppressHydrationWarning: next-themes adds class="dark" in the browser before React loads.
    // This tells React that this one difference on <html> is expected.
    <html lang="ro" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}