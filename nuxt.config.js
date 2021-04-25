import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - nuxt',
    title: 'nuxt',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ['~/plugins/axios.js',
    '~/plugins/loader.js',
    // '~/plugins/.js',



  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
   // '@nuxtjs/auth',
    '@nuxtjs/auth-next',
  ],


  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  router: {
     middleware: ['class'],
    // middleware: ['class']
  }
  ,
  axios: {
    baseURL: 'http://127.0.0.1:8000/api'
  },

  auth: {
    localStorage: false,
    strategies: {
      local: {
        scheme: 'refresh',
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token'},
          user: { url: 'user', method: 'get', propertyName: null},
          refresh: { url: 'refreshJWT', method: 'post', propertyName: 'token'},
          logout: false
          // logout : { url: 'logout' ,method: 'post'}
        },
        user: {
          property: false, // <---
        },
        token: {
          property: 'token',
          maxAge: 60 , // same as ttl but in seconds

        },
        tokenRequired: true
      },
      laravelJWT: {
        scheme: 'refresh',
        provider: 'laravel/jwt',
        url: 'http://127.0.0.1:8000/api/',
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'token'},
          user: { url: 'user', method: 'get', propertyName: null},
          refresh: { url: 'refreshJWT', method: 'post', propertyName: 'token'},
          // logout: false
          logout : { url: 'logout' ,method: 'post'}
        },
        token: {
          property: 'token',
          maxAge: 60 , // same as ttl but in seconds
        },
        tokenRequired: true
      },
    }
  },
  loading: {color: '#fff', height: '5px'},
  ssr:true,
  target:'static',

}
