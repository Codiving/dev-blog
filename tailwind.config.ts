import type { Config } from "tailwindcss";

const COMMON = {
  progressbar: "2px",
};

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: "0.875rem",
      },
      width: {
        sidebar: "280px",
      },
      height: {
        header: "60px",
        progressbar: COMMON.progressbar,
      },
      spacing: {
        progressbar: COMMON.progressbar,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
