module.exports = {
  content: [
      "./src/**/*.css",
      "./index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [
      require('@tailwindcss/forms')
  ],
}
