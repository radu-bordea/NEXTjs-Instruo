// components/theme/ThemeToggle.tsx
// Small icon button: shows a moon in light mode (click → dark), a sun in dark mode (click → light).
"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  // Wait for the browser before showing the icon (the server doesn't know the theme)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Same-size empty box while loading, so nothing jumps
  if (!mounted) return <div className="size-9" />;

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      // aria-label + title: screen readers and the hover tooltip need text, since there's only an icon
      aria-label={isDark ? "Mod luminos" : "Mod întunecat"}
      title={isDark ? "Mod luminos" : "Mod întunecat"}
      className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground"
    >
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}