import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../pages/HomePage.vue";
import CategoryPage from "../pages/CategoryPage.vue";
import Test from "../pages/Test.vue";
import ProductModal from "@/components/layout/product-modal/ProductModal.vue";
import BasketPage from "../pages/BasketPage.vue";
import CheckOutPage from "../pages/CheckOutPage.vue";

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
        path: "product/:product",
        component: ProductModal,
        props: route => ({...route.params,id: parseInt(route.params)}),
      }
    ]
  },
  {
    path: "/test",
    component: Test,
  },
  {
    path: "/basket",
    component: BasketPage,
    children:[
      {
        path: "product/:product",
        component: ProductModal,
        props: route => ({...route.params,id: parseInt(route.params)}),
      }
    ]
  },
  {
    path: "/checkout",
    component: CheckOutPage,
  }


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;