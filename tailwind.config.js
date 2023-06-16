import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  purge: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#083644',
          1000: '#083344'
        },
        cart: {
          dark: '#0E6060',
          light: '#209393',
          lighter: '#E1FFFE'
        },
        background: '#031425'
      }
    },
    screens: {
      xs: '0px',
      ...defaultTheme.screens
    },
    fontFamily: {
      body: [
        'Neucha',
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ],
      sans: [
        'Neucha',
        'Inter',
        'ui-sans-serif',
        'system-ui',
        '-apple-system',
        'system-ui',
        'Segoe UI',
        'Roboto',
        'Helvetica Neue',
        'Arial',
        'Noto Sans',
        'sans-serif',
        'Apple Color Emoji',
        'Segoe UI Emoji',
        'Segoe UI Symbol',
        'Noto Color Emoji'
      ]
    },
    container: {
      center: true
    }
  },
  variants: {
    extend: {}
  },
  content: [
    'node_modules/flowbite-vue/**/*.{js,jsx,ts,tsx}',
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}'
  ],
  plugins: [import('flowbite/plugin')]
}
