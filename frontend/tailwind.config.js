module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        win: {
          bg: '#008080',
          gray: '#c0c0c0',
          'gray-light': '#dfdfdf',
          'gray-dark': '#808080',
          'gray-darker': '#404040',
          white: '#ffffff',
          black: '#000000',
          blue: '#000080',
          'title-start': '#000080',
          'title-end': '#1084d0',
          'link': '#0000ff',
          'link-visited': '#800080',
          'content-bg': '#ffffff',
        }
      },
      fontFamily: {
        system: ['Tahoma', 'Microsoft Sans Serif', 'MS Sans Serif', 'Segoe UI', 'sans-serif'],
        mono: ['VT323', 'Courier New', 'Courier', 'monospace'],
        pixel: ['Press Start 2P', 'cursive'],
      },
      animation: {
        blink98: 'blink98 1s step-end infinite',
        marquee: 'marquee 18s linear infinite',
      },
      keyframes: {
        blink98: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
