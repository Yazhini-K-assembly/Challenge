/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: "#0048AA",
        customGray: "#eee",
        customBlue: "#002C88",
        customGray: "#ddd",
      },
    },
    gridTemplateAreas: {
      'chat-container': `
        'search-container chat-title'
        'conversation-list chat-message-list'
        'new-message-container chat-form'
      `,
      'main-layout': ['header header', 'sidebar content'],
    },
  },
  plugins: [
    // require('@savvywombat/tailwindcss-grid-areas'), 
  ],
}