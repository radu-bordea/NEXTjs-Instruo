// components/theme/ThemeProvider.tsx
// Wraps the app so any component can read or change the theme.
// Client component because it uses browser features (localStorage, system setting).
"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"          // adds class="dark" on <html> → our .dark CSS applies
      defaultTheme="system"      // first visit: follow the computer's setting
      enableSystem               // allow "system" as a choice
      disableTransitionOnChange  // no ugly color animation when switching
    >
      {children}
    </NextThemesProvider>
  );
}