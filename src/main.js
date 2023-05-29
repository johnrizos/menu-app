import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import HomePage from "./components/pages/home-page/HomePage.vue";
import CategoryPage from "./components/pages/demo/category-page/CategoryPage.vue";
import SingleCategoryPage from "./components/pages/demo/single-category/SingleCategoryPage.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", component: HomePage },
    { path: "/category", component: CategoryPage },
    { path: "/category/:id", component: SingleCategoryPage },




  ],
});

const app = createApp(App);

app.use(router)

app.mount("#app");
