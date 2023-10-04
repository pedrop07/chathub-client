import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './node_modules/flowbite-react/**/*.js',
    './node_modules/flowbite/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1c64f2',
        colorText: '#111827',
        darkTheme: {
          colorText: '#fff',
        }
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('flowbite/plugin')
  ],
}
export default config
