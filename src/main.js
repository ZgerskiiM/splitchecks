import App from "./App.vue";
import { createPinia } from "pinia";
import { createApp } from "vue";
import { router } from "./routers/router.js";
import { vuetify } from "./vuetifySettings.js";
import "./index.scss";


createApp(App).use(router).use(vuetify).use(createPinia()).mount("#app");
