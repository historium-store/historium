import defaultTheme from 'tailwindcss/defaultTheme'
export default {
  purge: ['./*.html', './src/**/*.{vue,js,ts,jsx,tsx,css}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        turquoise: '#209393',
        lightturquoise: '#6DBEBE',
        whiteblue: '#E1FFFE',
        deepblue: '#031425',
        deepgreen: '#084F4F',
        darkgreen: '#0A7E7E',
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
        background: '#031425',
        background_light: '#061b30'
      }
    },
    screens: {
      xs: '320px',
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
      ],
      rubik: ['Rubik', 'sans-serif']
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
