import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1320px" },
    },
    extend: {
      colors: {
        /* ── Verde bosque: la base emocional del sitio ── */
        bosque: {
          50: "#F1F6F2",
          100: "#DFEBE1",
          200: "#BFD6C4",
          300: "#95B99D",
          400: "#679576",
          500: "#477658",
          600: "#345C44",
          700: "#2A4937",
          800: "#22392C",
          900: "#1A2C22",
          950: "#0D1811",
        },
        /* ── Maderas / tonos tierra: calidez y textura ── */
        madera: {
          50: "#FBF7F2",
          100: "#F4EADC",
          200: "#E8D4B8",
          300: "#D8B78F",
          400: "#C69865",
          500: "#B57F49",
          600: "#9C673D",
          700: "#7F5134",
          800: "#68432F",
          900: "#573929",
          950: "#2F1D15",
        },
        /* ── Agua: la piscina, el estero, la laguna ── */
        agua: {
          50: "#EFFAFB",
          100: "#D7F2F5",
          200: "#B0E5EC",
          300: "#7BD1DE",
          400: "#41B4C8",
          500: "#2596AD",
          600: "#207A92",
          700: "#206377",
          800: "#215262",
          900: "#204553",
          950: "#0F2C38",
        },
        /* ── Sol: tomado del logo original de Puerta del Sol ── */
        sol: {
          50: "#FFF8ED",
          100: "#FFEFD4",
          200: "#FEDBA8",
          300: "#FDC171",
          400: "#FB9C38",
          500: "#F98012",
          600: "#EA6408",
          700: "#C24A09",
          800: "#9A3B0F",
          900: "#7C3210",
          950: "#431706",
        },
        crema: "#F7F3EC",
        arena: "#EDE4D6",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      letterSpacing: {
        widest2: "0.28em",
      },
      backgroundImage: {
        /* Grano de película en SVG embebido: da textura sin pedir una imagen extra.
           Los espacios van como %20 para que la URL sea válida en todos los navegadores. */
        grano:
          "url(\"data:image/svg+xml,%3Csvg%20viewBox='0%200%20200%20200'%20xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='4'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'%20opacity='0.35'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-vertical": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "spin-border": {
          to: { "--angulo": "360deg" },
        },
        flotar: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -6%, 0) scale(1.15)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(0)", opacity: "0" },
          "40%": { opacity: "1" },
          "100%": { transform: "translateY(14px)", opacity: "0" },
        },
      },
      animation: {
        marquee: "marquee var(--duration, 40s) linear infinite",
        "marquee-vertical": "marquee-vertical var(--duration, 40s) linear infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-border": "spin-border 5s linear infinite",
        flotar: "flotar 6s ease-in-out infinite",
        "aurora-drift": "aurora-drift 18s ease-in-out infinite",
        "scroll-hint": "scroll-hint 2s ease-in-out infinite",
      },
      transitionTimingFunction: {
        suave: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        premium: "0 30px 80px -30px rgba(13, 24, 17, 0.55)",
        "premium-sm": "0 18px 45px -22px rgba(13, 24, 17, 0.45)",
      },
    },
  },
  plugins: [],
};

export default config;
