<script setup>
import { ref } from "vue";

import { useBasketStore } from '../../stores/basket';

const basketStore = useBasketStore();
</script>
<template>
    <div class="position-fixed  bottom-0 start-50 translate-middle-x"
        style="width:100%;">
        <div class="card w-100 m-auto">
            <div class="card-body">
                <!-- <h5 class="card-title">Card title</h5>
                <p class="card-text">With supporting text below as a natural lead-in to additional content.</p> -->
                <!-- <button href="#" class="bw-100 btn btn-primary btn-lg"><span
                        class="badge bg-white text-dark me-2">4</span>Καλάθι
                </button> -->
                
                <div class="d-grid gap-2">
                    <button class="btn btn-warning fw-bold btn-lg" type="button">
                        <div class="d-flex justify-content-between">
                        <div><span
                        class="badge bg-white text-dark mx-2">{{ basketStore.totalQuantityOfProducts }}</span></div>
                        <div> <font-awesome-icon icon="fa-solid fa-basket-shopping" class="pe-1"/>Καλάθι </div>
                        <div>{{ basketStore.totalPrice }}€</div>
                        
                        </div>
</button>
                </div>
            </div>
        </div>
    </div>
</template>


<style  scoped></style>