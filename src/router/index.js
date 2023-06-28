import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import Test from "../pages/Test.vue";
import ProductModal from "@/components/layout/product-modal/ProductModal.vue";

const routes = [
  {
    path: "/",
    component: HomePage,
  }, 
  {
    path: "/category/:id",
    component: CategoryPage,
    children:[
      {
        path: "modal/:product_id",
        component: ProductModal,
        props: route => ({...route.params,id: parseInt(route.params)}),
      }
    ]
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