// COLORS.ink/line/lineSoft resolve through CSS custom properties (set on the
// app's root element by App.jsx via themeCssVars()) so every component that
// already reads COLORS.ink automatically follows the user's chosen accent —
// no prop-drilling needed.
//
// COLORS.gold/teal/brick are FIXED semantic colors (warning / positive-saved /
// danger) and are never affected by the accent theme, so "saved" always reads
// as green and "over budget" always reads as red regardless of which accent
// the user picks.
export const COLORS = {
  ink: "var(--uf-ink)",
  paper: "#101820",
  paperDim: "#17232D",
  gold: "#E7B86A",
  teal: "#55C5A0",
  brick: "#F07878",
  line: "rgba(var(--uf-ink-rgb),0.14)",
  lineSoft: "rgba(var(--uf-ink-rgb),0.08)",
};

// Accent theme presets (four only). `swatch` is the color shown in the theme
// picker; `ink` is what's used for text/backgrounds/borders app-wide. Any
// previously saved accent that no longer exists falls back to Navy via
// getTheme().
export const THEME_PRESETS = [
  { key: "navy", name: "Navy", swatch: "#4F8CFF", ink: "#4F8CFF" },
  { key: "maroon", name: "Maroon", swatch: "#F07878", ink: "#F07878" },
  { key: "plum", name: "Plum", swatch: "#B69CFF", ink: "#B69CFF" },
  { key: "black", name: "Black", swatch: "#D9E4EF", ink: "#D9E4EF" },
];

export const DEFAULT_ACCENT_KEY = "navy";

export const FONT_VOICE = "'Inter', system-ui, sans-serif";
export const FONT_MONO = "'IBM Plex Mono', SFMono-Regular, Menlo, Consolas, monospace";
export const FONT_UI = "'Inter', system-ui, -apple-system, 'Segoe UI', sans-serif";

export function getTheme(key) {
  return THEME_PRESETS.find((t) => t.key === key) || THEME_PRESETS[0];
}

export function hexToRgbTriplet(hex) {
  const h = hex.replace("#", "");
  const r = parseInt(h.substring(0, 2), 16);
  const g = parseInt(h.substring(2, 4), 16);
  const b = parseInt(h.substring(4, 6), 16);
  return `${r},${g},${b}`;
}

// Returns the CSS custom properties to spread onto the app's root element's
// inline `style`. Everything downstream (COLORS.ink/line/lineSoft, and any
// component using them) picks this up automatically via CSS var cascade.
export function themeCssVars(accentKey) {
  const t = getTheme(accentKey);
  return {
    "--uf-ink": t.ink,
    "--uf-ink-rgb": hexToRgbTriplet(t.ink),
  };
}

export function fmt(n) {
  const v = Math.round(n * 100) / 100;
  return v.toLocaleString("en-MY", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
