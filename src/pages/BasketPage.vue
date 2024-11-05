<script setup>
import { ref,reactive, watch, onBeforeMount,onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../stores/basket';
import router from '@/router';
import priceHook from '@/hooks/price/priceHook.js';
import goBackOrHome from '../hooks/navigation/goBackOrHome.js';
import {productWithGroupOfExtra}  from '@/http/product/product-api.js';
import SingleOrderCart from '../components/layout/basket-page-components/SingleOrderCart.vue';



const {textPriceToNumber, calculateNumberPriceAndQuantity, totalProductPrice,priceForExtras} = priceHook();

console.log("productWithGroupOfExtra", productWithGroupOfExtra(1));
// get the basket from localstorage
const basketStore = useBasketStore();
const productOrderId = "1730724458135-4292";
// console.log("basketStore", basketStore.basket);
const basketOrders = reactive({});


async function getBasketOrders() {
//a function which will get the basket orders from localstorage with the use of the basket store and then get the api for each  order and then check if everything workls properly for example the prices and also if exist the extras for each product
  console.log("getBasketOrders works");
  const basket = basketStore.basket;
  const objectOreders = {};
  console.log("basket", basket);

  for (const [key, value] of Object.entries(basket)) {
    console.log("key", key);
    console.log("value", value);
    console.log("value id", value.product_id);
    const product = await productWithGroupOfExtra(value.product_id);
    console.log("product", product);
    
    const productGroupOfExtra = product["product_group_of_extra"] ?? [];
    console.log("productGroupOfExtra", productGroupOfExtra);

    console.log("basket.extras", value.extras);
    
    const price = totalProductPrice(textPriceToNumber(product.price) + priceForExtras(productGroupOfExtra,value.extras ?? null), value.quantity);
    console.log("price", price);
    
    console.log("product", product);
    if (product) {
      const productOrder = {
        id: product.id,
        title: product.name,
        price: price,
        quantity: value.quantity,
        extras: product.extras
      }
      if (!objectOreders[key]) {
        objectOreders[key] = [];
      }
      objectOreders[key] = productOrder;
    }
  }
  console.log("objectOreders", objectOreders);
  Object.assign(basketOrders, objectOreders);

  return;
}
getBasketOrders();


// create productGroupOfExtras data from the api to preview the products in the basketpage
// const productGroupOfExtras = reactive({});

const productsInBasket = ref([
  {
    id: 1,
    title: "Προϊόν 1",
    price: "10,23",
    quantity: 1
  },
  {
    id: 2,
    title: "Προϊόν 2",
    price: "20,23",
    quantity: 1
  }
]);



// funtion to go to the checkkout
function proceedToCheckOut() {
  console.log("proceedToCheckOut works");
  router.push("/checkout");
};



console.log("test", textPriceToNumber("10,23"));





// functions

// delete item from basket basketOrders and localstorage
function removerItem(key) {
  console.log("removerItem works");
  console.log("key", key);
  basketStore.removerItem(key);
  delete basketOrders[key];
}

function clickHandlerItem(orderId){
  console.log("orderId", orderId);
  
  console.log("clickHandlerItem works");
}

// watchers
watch(basketStore, (newValue, oldValue) => {
  console.log("newValue totalQuantityOfProducts", newValue.totalQuantityOfProducts);
  if (newValue.totalQuantityOfProducts === 0) {
    goBackOrHome();
  }
})

// lifecycle hook

onMounted(async () => {
  // productGroupOfExtras = await data();
  // console.log("onMounted productGroupOfExtras: ", productGroupOfExtras.value);

});

onBeforeMount(() => {
  if (!basketStore.totalQuantityOfProducts || basketStore.totalQuantityOfProducts === 0) {
    goBackOrHome();
  }
})
</script>
<template>
  <section class="" style="background-color: #eee;">
    <div class="container p-0 m-0  p-sm-0   m-auto h-100">
      <div class="card h-custom ">
        <div class="card-body my-0 py-0 pt-0 position-relative">
          <!-- header -->
          <div class="position-sticky top-0 start-0" style="z-index:100;">
            <div class="row bg-white p-3 shadow  mb-2 bg-body  rounded d-flex ">

              <div class="col-1">
                <div @click="goBackOrHome" class="d-flex justify-content-start"><font-awesome-icon
                    icon="fa-solid fa-angle-left" /></div>
              </div>
              <div class="col-10">
                <div class="d-flex justify-content-center">Καλάθι</div>

              </div>
            </div>
          </div>
          <!-- end of header -->
          <!-- products -->
          <div class="mt-4" style="">
              <!--  -->
              <SingleOrderCart  v-for=" ([key, value]) in Object.entries(basketOrders)" :value="value" :key="key" :orderID="key" :clickHandlerItem="clickHandlerItem" :removerItem="removerItem" />
          </div>
          <!--end of products -->


        </div>
        <router-view />
        <!-- footer  -->
        <div v-if="basketStore.totalQuantityOfProducts > 0"
          class="position-fixed  bottom-0 start-50 translate-middle-x checkout-cta" style="width:100%;">
          <div class="card w-100 m-auto">
            <div class="card-body">
              <div class="d-grid gap-2">
                <button @click="proceedToCheckOut" class="btn btn-success fw-bold btn py-2" type="button">
                  <div class="d-flex justify-content-between">
                    <div><span class="badge bg-white text-dark mx-2">{{ basketStore.totalQuantityOfProducts }}</span>
                    </div>
                    <div> Ολοκλήρωση Παραγγελίας </div>
                    <div>{{ basketStore.totalPrice }}€</div>

                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style  scoped>
.h-custom {
  min-height: calc(90vh - 40px);
}

@media (min-width: 1025px) {
  .h-custom {
    min-height: calc(80vh - 40px);
  }
}

.mouse-pointer {
  cursor: pointer;
}

.checkout-cta {
  max-width: 400px;
}
</style>