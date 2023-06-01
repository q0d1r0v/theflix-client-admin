// imports
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// import router from router file
import { router } from './routes/router'

// import asn use quasar
import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { Quasar, Notify, Loading } from 'quasar'

// import and use pinia
import { createPinia } from 'pinia'
const pinia = createPinia()

createApp(App)
    .use(router)
    .use(Quasar, {
        plugins: {
            Notify,
            Loading
        }
    })
    .use(pinia)
    .mount('#app')
