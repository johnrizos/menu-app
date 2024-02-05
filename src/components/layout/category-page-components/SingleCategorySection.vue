<script setup>
import { inject } from 'vue'
import SingleProductCard from './SingleProductCard.vue'
const props = defineProps(
    {
        productCategory:Array,
        productModalOpenOrClosed: Function,
        updateProductModal: Function,

    }
    );
const api_url = inject('api_url');
const images_url =inject('images_url');
</script>

<template>
    <div class="card bg-transparent">
        <section class="card-body bg-info p-0">
            <div class="d-flex flex-row align-items-center p-2">
                <div class="flex-grow-1 flex-shrink-1">
                    <div class="text-dark fw-bold font-size-h3 mb-1 text-start">
                        {{ productCategory.name }}
                    </div>
                    <div class="text-dark-75">

                    </div>
                </div>
                <div v-if="productCategory.img" class="flex-grow-3 flex-shrink-0">
                    <div class="symbol symbol-80">
                        <div class="symbol symbol-100" style="background-color: rgb(107, 144, 255);">
                            <!----> <img width="100" height="100"
                                :src="images_url +'products/' + productCategory.img">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <single-product-card :productModalOpenOrClosed="productModalOpenOrClosed" v-for="product in productCategory.products" :product="product" :key="product.id" :updateProductModal="updateProductModal">
        </single-product-card>
        <!-- <div data-v-75adc2ff="">
            

        </div> -->
    </div>
</template>



<style>

</style>
