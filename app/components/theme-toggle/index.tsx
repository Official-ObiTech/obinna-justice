"use client";

import { useSyncExternalStore } from "react";
import { getTheme, onThemeChange, THEME_STORAGE_KEY, type Theme } from "../theme";

// Floating light/dark switch, fixed to the bottom-right corner on every page.
export default function ThemeToggle() {
  // null during server rendering; the real theme is only known in the browser.
  const theme = useSyncExternalStore(onThemeChange, getTheme, () => null);

  const next: Theme = theme === "light" ? "dark" : "light";

  return (
    <button
      type="button"
      onClick={() => {
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem(THEME_STORAGE_KEY, next);
        } catch {}
      }}
      aria-label={theme ? `Switch to ${next} mode` : "Switch theme"}
      title={theme ? `Switch to ${next} mode` : undefined}
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-5 z-40 grid h-12 w-12 place-items-center rounded-full border border-line bg-surface/90 text-fg shadow-[0_12px_32px_-8px_rgb(0_0_0/0.6)] backdrop-blur-md transition-transform hover:scale-110 active:scale-95 light:shadow-[0_12px_28px_-10px_rgb(15_23_42/0.35)] sm:bottom-6 sm:right-6"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
        {theme === "light" ? (
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        ) : (
          <>
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </>
        )}
      </svg>
    </button>
  );
}
