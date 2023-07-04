import { createApp } from "vue";
import { createPinia } from "pinia";

import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import router from "./router/index.js";

import "bootstrap/dist/css/bootstrap.css";

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from "@fortawesome/free-solid-svg-icons";

library.add(fas)
/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

const app = createApp(App);
app.use(createPinia());
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon);

app.mount("#app");
import "bootstrap/dist/js/bootstrap.js";
