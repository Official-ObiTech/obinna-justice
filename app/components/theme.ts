// Light/dark theme helpers. The theme lives in the data-theme attribute on <html>.

export type Theme = "light" | "dark";

export const THEME_STORAGE_KEY = "theme";

// The site starts in dark mode; light mode only applies once a visitor chooses it.
export const DEFAULT_THEME: Theme = "dark";

// Runs in <head> before the page paints, so there's no flash of the wrong theme.
// Uses the visitor's saved choice, otherwise the default.
export const themeInitScript = `(function(){var t;try{t=localStorage.getItem("${THEME_STORAGE_KEY}")}catch(e){}if(t!=="light"&&t!=="dark"){t="${DEFAULT_THEME}"}document.documentElement.dataset.theme=t})()`;

export function getTheme(): Theme {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}

export function onThemeChange(callback: (theme: Theme) => void) {
  const observer = new MutationObserver(() => callback(getTheme()));
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => observer.disconnect();
}

// Reads a colour token (e.g. "--ink") from the current theme.
export function themeColor(name: string) {
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
