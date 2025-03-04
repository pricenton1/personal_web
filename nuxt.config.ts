// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  pages: true,
  css: [
    '~/assets/css/main.css',
    '@fortawesome/fontawesome-free/css/all.css'
  ],
  // plugins: [
  //   '@/plugins/fontawesome.js'
  // ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiConfig: process.env.NUXT_PERSONAL ? JSON.parse(process.env.NUXT_PERSONAL) : {},
    },
  },
  app: {
    pageTransition: { 
      name: 'page', 
      mode: 'out-in' 
    }
  }
})
