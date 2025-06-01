import { type Config } from "tailwindcss"

export default {
  content: ["src/app/**/*.{ts,tsx}", "src/components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "var(--color-bg)",
        tick: "var(--color-tick)",
        "tick-text": "var(--color-tick-text)",
      },
    },
  },
} satisfies Config
