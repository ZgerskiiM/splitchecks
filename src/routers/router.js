import { createRouter, createWebHistory } from 'vue-router';

import Main from '/src/pages/Main.vue';
import AddingPeople from '/src/pages/AddingPeople.vue';
import AddingChecks from '/src/pages/AddingChecks.vue';
import Result from '/src/pages/Result.vue';

export const router = createRouter({
    routes: [
    {path: '/', component: Main},
    {path: '/addpeople', name: 'addpeople', component: AddingPeople},
    {path: '/checks', name: 'addchecks', component: AddingChecks},
    {path: '/result', name: 'result', component: Result},
  ],
    history: createWebHistory()
  });

