<script setup>
import { ref, watch, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../stores/basket';
import router from '@/router';
import priceHook from '../hooks/price/priceHook.js';
import goBackOrHome from '../hooks/navigation/goBackOrHome.js';

const basketStore = useBasketStore();
const proceedToCheckOut = (() => {
  console.log("proceedToCheckOut works");
  router.push("/checkout");
});


const [textPriceToNumber, calculateNumberPriceAndQuantity, totalProductPrice] = priceHook();

console.log("test", textPriceToNumber("10,23"));


watch(basketStore, (newValue, oldValue) => {
  console.log("newValue totalQuantityOfProducts", newValue.totalQuantityOfProducts);
  if (newValue.totalQuantityOfProducts === 0) {
    goBackOrHome();
  }
})

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
            <div v-for=" ([key, value]) in Object.entries(basketStore.basket)" :key="key" class="card mb-3">
              <div class="card-body p-1  pe-2">
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <!-- <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;"> -->
                    </div>

                    <div style="width: 50px;">
                      <span class="input-group-text bg-white d-block"
                        style="background-color:rgb(247, 247, 247)!important">{{ value.quantity }}</span>
                    </div>
                    <div class="ms-3">
                      <p class="m-0">{{ value.title }}</p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">


                    <div style="width: 80px;">
                      <p class="mb-0">{{ totalProductPrice(value.price, value.quantity) }}€</p>
                    </div>
                    <div @click="basketStore.removerItem(key)" style="color: #cecece;" class="text-danger"><i
                        class="fas fa-trash-alt"></i></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!--end of products -->


        </div>
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

.checkout-cta {
  max-width: 400px;
}
</style>