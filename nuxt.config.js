export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'CRUD ITCW',
        htmlAttrs: {
            lang: 'es'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: '' },
            { name: 'format-detection', content: 'telephone=no' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
        ]
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        "./plugins/element-ui.js"
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
        '@nuxtjs/tailwindcss',
        '@nuxtjs/vuetify',
        // With options
        ['@nuxtjs/vuetify', { /* module options */ }]
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios'
    ],
    axios: {
        //new url
        //API
        baseURL: "http://68.183.159.212:8080",
    },
    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
    }
}
