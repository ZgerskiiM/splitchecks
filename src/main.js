import App from './App.vue';


import { createPinia } from 'pinia';
import { createApp } from 'vue'
import { createVuetify } from 'vuetify';
import { createRouter, createWebHistory } from 'vue-router';
import Main from './pages/Main.vue';
import AddingPeople from './pages/AddingPeople.vue';
import AddingChecks from './pages/AddingChecks.vue';
import Result from './pages/Result.vue';


import './style.scss';
import 'vuetify/styles';

import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  components,
  directives,
});

const router = createRouter({
  routes: [
  {path: '/', component: Main},
  {path: '/addpeople', name: 'addpeople', component: AddingPeople},
  {path: '/checks', name: 'addchecks', component: AddingChecks},
  {path: '/result', name: 'result', component: Result},
],
  history: createWebHistory()
});

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount('#app');
app.use(vuetify);
