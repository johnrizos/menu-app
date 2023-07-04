<script setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../stores/basket';
import router from '@/router';

const basketStore = useBasketStore();
const backRoute = (()=>{
    router.back();
});

</script>
<template>
    <section   class="h-100 h-custom" style="background-color: #eee;">
  <div class="container p-0 m-0  p-sm-5 h-100 position-relative">
        <div class="card">
          <div class="card-body  pt-0" >
            <div class="position-sticky top-0 start-0" style="z-index:100;">
            <div class="row bg-white p-3 shadow  mb-2 bg-body  rounded d-flex " >

              <div class="col-1">
                        <div @click="backRoute" class="d-flex justify-content-start"><font-awesome-icon icon="fa-solid fa-angle-left" /></div>
                </div> 
                <div class="col-10">
                    <div class="d-flex justify-content-center">Παραγγελία</div>

                </div>
            </div>
        </div>
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
                          <span  class="input-group-text bg-white d-block" style="background-color:rgb(247, 247, 247)!important">{{ value.quantity }}</span>
                        </div>
                        <div class="ms-3">
                          <p class="m-0">{{value.title}}</p>
                        </div>
                      </div>
                      <div class="d-flex flex-row align-items-center">


                        <div style="width: 80px;">
                          <p class="mb-0">{{value.price}}€</p>
                        </div>
                        <a href="#!" style="color: #cecece;" class="text-danger"><i class="fas fa-trash-alt"></i></a>
                      </div>
                    </div>
                  </div>
                </div>

          </div>
        </div>
      </div>
</section>
</template>


<style  scoped>
@media (min-width: 1025px) {
.h-custom {
height: 100vh !important;
}
}
</style>