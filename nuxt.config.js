const APP_URL = 'https://bidify-zcwd7.ondigitalocean.app/'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Bidify',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'NFT Auction Market (non-fungible tokens)' },
      { property: 'og:title', content: 'Bidify - NFT Auction Market' },
      { property: 'og:description', content: 'NFT Auction Market (non-fungible tokens)' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: APP_URL },
      { property: 'og:image', content: APP_URL + '/seo/og.png' },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '800' }
    ],
    link: [
      { rel: 'apple-touch-icon', href: '/icon/apple-touch-icon.png', sizes: '180x180' },
      { rel: 'icon', href: '/icon/favicon-32x32.png', sizes: '32x32' },
      { rel: 'icon', href: '/icon/favicon-16x16.png', sizes: '16x16' },
      { rel: 'manifest', href: '/icon/site.webmanifest' }
    ],
    script: [

    ]
  },
  dev: process.env.NODE_ENV !== 'production',
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '@/assets/styles/app.styl',
    '@/assets/styles/theme.styl',
    '@/assets/theme/index.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/element-ui',
    { src: '@/plugins/bidify', ssr: false, mode: 'client' },
    { src: '@/plugins/browser', ssr: false, mode: 'client' },
    { src: '@/plugins/element-ui' },
    { src: '@/plugins/image-preloader', ssr: false, mode: 'client' },
    { src: '@/plugins/listings', ssr: false, mode: 'client' },
    { src: '@/plugins/mixins', ssr: false, mode: 'client' },
    { src: '@/plugins/opensea', ssr: false, mode: 'client' },
    { src: '@/plugins/wallets', ssr: false, mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/style-resources',
    '@aceforth/nuxt-optimized-images',
    '@nuxtjs/svg',
    '@nuxtjs/device',
    '@nuxtjs/google-gtag',
    '@nuxtjs/color-mode'
  ],

  // 'google-gtag': {
  //   id: 'UA-XXXXXXXX',
  //   config: {
  //     anonymize_ip: true, // anonymize IP
  //     linker: {
  //       domains: ['bidify.org']
  //     }
  //   }
  //   // debug: true, // enable to track in dev mode
  // },

  styleResources: {
    stylus: [
      './assets/mixins.styl',
      './assets/tokens.styl',
      '@nib'
    ]
  },

  optimizedImages: {
    optimizeImages: true,
    optimizeImagesInDev: true,
    handleImages: ['jpeg', 'png', 'webp', 'gif']
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    // https://go.nuxtjs.dev/content
    '@nuxt/content',
    'nuxt-webfontloader',
    ['nuxt-vuex-localstorage', {
      wallet: {
        provider: null,
        keepDisconnect: false
      }
    }]
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [/^element-ui/]
  }
}
