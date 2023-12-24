import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js"
  ],
  theme: {
    fontFamily: {
      'sans': ['montserrat'],
      'serif': ['PT Serif'],
    },
    extend: {},
  },
  plugins: [
    require("flowbite/plugin")
  ],
} satisfies Config

