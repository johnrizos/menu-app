import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import Test from "../pages/Test.vue";


const routes = [
  {
    path: "/",
    component: HomePage,
  }, 
  {
    path: "/category/:id",
    component: CategoryPage,
  },
  {
    path: "/test",
    component: Test,
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;