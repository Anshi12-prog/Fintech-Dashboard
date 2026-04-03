module.exports = {
  darkMode: 'class',
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#7BD389',
          light: '#BFF4D0'
        },
        softblue: '#89C9FF',
        accent: '#A7F3D0'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto'],
      },
      boxShadow: {
        soft: '0 6px 18px rgba(15, 23, 42, 0.08)'
      }
    },
  },
  plugins: [],
}
