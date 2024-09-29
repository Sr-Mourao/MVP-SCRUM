import { createResolver } from "@nuxt/kit";
import vuetify from "vite-plugin-vuetify";

const { resolve } = createResolver(import.meta.url);

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  typescript: {
    shim: false,
  },
  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
  },

  modules: [
    '@pinia/nuxt',
    async (options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config: any) =>
        // @ts-ignore
        config.plugins.push(vuetify({
          styles: { configFile: resolve("/assets/scss/variables.scss") },
        }))
      );
    },
  ],
  pinia: {
    storesDirs: ['./stores/**']
  },
  runtimeConfig: {
    public: {
      baseUrlApi: process.env.API_BASE_URL,
      userPoolId: process.env.AMPLIFY_USERPOOL_ID,
      userPoolClientId: process.env.AMPLIFY_WEBCLIENT_ID
    }
  },
  app: {
    head: {
      title:
        "SCRUM - MMOUU",
        // link: [
        //   { rel: 'icon', type: 'image/png', href: '/logo-favicon.svg' }
        // ]
    },
  },
  sourcemap: { server: false, client: false },
  devServerHandlers: [],
})
