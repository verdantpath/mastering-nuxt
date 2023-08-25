export default {
  components: true,
  head: {
    titleTemplate: "Mastering Nuxt: %s",
    htmlAttrs: {
      lang: "en"
    },
    bodyAttrs: {
      class: ["my-style"]
    },
    meta: [{
      charset: "utf-8"
    }]
  },
  router: {
    prefetchLinks: false
  },
  plugins: [
    '~/plugins/maps.client',
    '~/plugins/dataApi',
    '~/plugins/auth.client',
  ],
  modules: [
    '~/modules/auth',
    '~/modules/algolia',
  ],
  buildModules: [
    '@nuxtjs/tailwindcss'
  ],
  css: [
    '~assets/sass/app.scss'
  ],
  build: {
    extractCSS: true,
    loaders: {
      limit: 0, 
    }
  },
  publicRuntimeConfig: {
    auth: {
      cookieName: 'idToken',
      clientId: '209367763963-skp5qcc6n54in1tgfnnia8evtb6rj42q.apps.googleusercontent.com',
    },
    algolia: {
      appId: 'DSC80G85H6',
      key: '4b03de1a0fb2f091ee9a8212600a214c',
    }
  },
  privateRuntimeConfig: {
    algolia: {
      appId: 'DSC80G85H6',
      key: '9cf34ba988f71ae3a67909afe36f2935',
    }
  },

}