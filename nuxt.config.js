import fs from 'fs'
import i18n from './nuxt-i18n.config'
import vuetify from './vuetify.config'
import lang from './lang/ja'

const config = loadConfig('./config.json')

export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    title: lang.APP_NAME,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: lang.APP_DESCRIPTION }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Roboto|Noto+Sans+JP&display=swap' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/stylelint-module',
    ['@nuxtjs/vuetify', vuetify],
    'nuxt-client-init-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    ['nuxt-i18n', i18n]
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },
  env: {
    config
  }
}

function loadConfig (filepath) {
  try {
    const data = fs.readFileSync(filepath, 'utf-8')
    return JSON.parse(data)
  } catch (ignored) {
    const {
      API_ORIGIN,
      TWITTER_ID
    } = process.env
    return {
      API_ORIGIN,
      TWITTER_ID
    }
  }
}
