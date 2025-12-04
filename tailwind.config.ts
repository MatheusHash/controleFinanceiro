// tailwind.config.ts
import type { Config } from 'tailwindcss'
import postcssPluginWarning from 'tailwindcss'

const config: Config = {
  content: [
    // "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    // ajuste os caminhos conforme sua estrutura
  ],
  theme: {
    extend: {
      colors: {
        primary: { custom: '#2563EB' },
        gray: {
          custom: '#374151',
        },
        green: {
          neon: '#22C55E',
        },
      },
    },
  },

  plugins: [postcssPluginWarning],
}

export default config
