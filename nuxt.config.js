export default {
  head: {
    title: 'nuxtjs-firebase-auth',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css', }
    ],
    script: [
      { src: 'https://code.jquery.com/jquery-3.5.1.slim.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js' },
      { src: 'https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.min.js' }
    ]
  },

  css: [
  ],

  plugins: [
  ],

  components: true,

  buildModules: [
  ],

  modules: ['@nuxtjs/axios'],

  build: {
  },

  env: {
    firebaseAPIKey: 'AIzaSyClD1dLhrUSlGDyoccIh4UeLx1FNcyoGsw',
    signInEndpoint: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=',
    signUpEndpoint: 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='
  }
}
