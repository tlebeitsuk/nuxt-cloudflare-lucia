// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxthq/ui'
  ],
  nitro: {
    preset: 'cloudflare-module'
  }
})
