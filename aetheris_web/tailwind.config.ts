import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-fixed-dim": "#c8c6c5",
        "on-primary-fixed-variant": "#474646",
        "on-tertiary-fixed-variant": "#00530e",
        "surface-bright": "#37393a",
        "on-secondary-container": "#b7b5b4",
        "tertiary-fixed": "#72ff70",
        "on-error-container": "#ffdad6",
        "surface-container-highest": "#333535",
        "on-secondary-fixed-variant": "#474746",
        "surface-tint": "#c8c6c5",
        "inverse-on-surface": "#2f3131",
        "on-secondary-fixed": "#1c1b1b",
        "on-background": "#e2e2e2",
        "secondary-fixed": "#e5e2e1",
        "on-tertiary": "#003907",
        "surface-variant": "#333535",
        "outline": "#8e9192",
        "surface": "#121414",
        "on-tertiary-container": "#009220",
        "surface-container-high": "#282a2b",
        "on-surface": "#e2e2e2",
        "surface-container": "#1e2020",
        "secondary": "#c8c6c5",
        "tertiary": "#00e639",
        "on-secondary": "#313030",
        "primary-fixed": "#e5e2e1",
        "tertiary-container": "#001701",
        "on-error": "#690005",
        "primary-container": "#121212",
        "inverse-surface": "#e2e2e2",
        "inverse-primary": "#5f5e5e",
        "outline-variant": "#444748",
        "primary": "#c8c6c5",
        "background": "#121414",
        "on-primary-container": "#7e7d7d",
        "surface-container-low": "#1a1c1c",
        "on-surface-variant": "#c4c7c7",
        "primary-fixed-dim": "#c8c6c5",
        "tertiary-fixed-dim": "#00e639",
        "on-tertiary-fixed": "#002203",
        "surface-dim": "#121414",
        "on-primary": "#313030",
        "error-container": "#93000a",
        "error": "#ffb4ab",
        "secondary-container": "#474746",
        "on-primary-fixed": "#1c1b1b",
        "surface-container-lowest": "#0c0f0f"
      },
      spacing: {
        "button-gap": "12px",
        "unit": "4px",
        "bezel-margin": "24px",
        "display-padding": "20px",
        "section-gutter": "32px"
      },
      fontFamily: {
        "button-label": ["var(--font-barlow)", "sans-serif"],
        "label-small": ["var(--font-work-sans)", "sans-serif"],
        "display-brand": ["var(--font-instrument-serif)", "serif"],
        "lcd-main": ["var(--font-barlow)", "sans-serif"]
      },
      fontSize: {
        "button-label": ["14px", { lineHeight: "16px", letterSpacing: "0.02em", fontWeight: "700" }],
        "label-small": ["11px", { lineHeight: "14px", letterSpacing: "0.1em", fontWeight: "500" }],
        "display-brand": ["24px", { lineHeight: "32px", letterSpacing: "0.05em", fontWeight: "400" }],
        "lcd-main": ["48px", { lineHeight: "56px", letterSpacing: "-0.02em", fontWeight: "600" }]
      }
    },
  },
  plugins: [],
};
export default config;
