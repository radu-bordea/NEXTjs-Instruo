// app/layout.tsx
// Root layout: html, body, fonts, Clerk (login) and theme providers.

import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { shadcn } from "@clerk/ui/themes";
import { roRO } from "@clerk/localizations";
import ThemeProvider from "@/components/theme/ThemeProvider";
import "./globals.css";

const fontSans = Inter({ subsets: ["latin", "latin-ext"], variable: "--font-sans" });
const fontMono = JetBrains_Mono({ subsets: ["latin", "latin-ext"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Instruo",
  description: "Fișe de instruire SSM digitale pentru consultanți",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontMono.variable} font-sans antialiased`}>
        {/* ClerkProvider: makes login info available everywhere.
            theme: shadcn → Clerk uses our CSS variables (teal, dark mode).
            localization: roRO → Clerk's texts in Romanian. */}
        <ClerkProvider appearance={{ theme: shadcn }} localization={roRO}>
          <ThemeProvider>{children}</ThemeProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}