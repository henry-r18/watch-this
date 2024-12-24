// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  app: {
    rootAttrs: {
      class: "h-full",
    },
  },
  modules: ["@nuxt/image", "@nuxt/ui"],
  css: ["~/assets/css/main.css"],
  runtimeConfig: {
    movieRecommendationAssistantID: "asst_KH2qnIierNDS5HmNYaryWPPc",
  },
});
