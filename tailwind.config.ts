import type { Config } from "tailwindcss";

export const COMMON = {
  progressbar: 2,
  header: 60,
  sidebar: 280,
};

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontSize: {
        xs: "0.875rem",
      },
      width: {
        sidebar: `${COMMON.sidebar}px`,
      },
      height: {
        header: `${COMMON.header}px`,
        progressbar: `${COMMON.progressbar}px`,
      },
      spacing: {
        progressbar: `${COMMON.progressbar}px`,
      },
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
} satisfies Config;
