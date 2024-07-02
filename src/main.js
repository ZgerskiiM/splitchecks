import App from './App.vue';
import { createPinia } from 'pinia';
import { createApp } from 'vue'
import { router } from './routers/router.js'
import './style.scss';
import { vuetify } from './vuetifysettings.js'

createApp(App).use(router).use(vuetify).use(createPinia()).mount('#app')
