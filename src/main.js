import App from './App.vue'

createApp(App).mount('#app')

import { createApp } from 'vue'
import index from './pages/index.vue'
import page2 from './pages/page2.vue'
import page3 from './pages/page3.vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'

import './style.css';


import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  routes: [{
    path: '/',
    component: index
  },
  {path: '/123', name: 'addpeople', component: page2},
  {path: '/checks', name: 'addchecks', component: page3},
],
  history: createWebHistory()
})

const app = createApp(App)
app.use(router)
app.mount('#app')
app.use(vuetify)



