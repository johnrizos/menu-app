
<script setup>
import { inject, ref } from 'vue';
import price from '../../../hooks/price/priceHook.js'
// Props
const api_url = inject('api_url');
const images_url = inject('images_url');
// const numberPriceToText = price.numberPriceToText;
const {numberPriceToText} = price();
// console.log("numberPriceToText", numberPriceToText(2.11));
const props = defineProps(
    {
        product: Object,
        productModalOpenOrClosed: Function,
        updateProductModal: Function
    }
);
const id = ref(1);

// Created
// console.log("product.prices=", props.product);
</script>


<template>
    <router-link :to="'/category/1/product/' + product.id  ">
        <div class="card">
            <!---->
            <div class="card-body p-2">
                <div class="d-flex align-items-center justify-content-start singleitem flex-row">
                    <div class="mr-2 flex-grow-1 flex-shrink-1 text-start">
                        <div class="text-dark font-weight-bold mb-1">
                            <h5>{{ product.name }}</h5>
                        </div>
                        <div v-if="product.description" class="text-dark-75 mb-1">
                            {{ product.description }}
                        </div>
                        <!---->
                        <div class="text-dark-75 label label-inline d-inline label-rounded label-xl">
                            {{ numberPriceToText(product.price) }} €
                        </div>
                    </div>
                    <div class="flex-grow-3 flex-shrink-0 image">
                        <div class="symbol symbol-100">
                            <img v-if="product.image" :src="images_url + 'products/' + product.image"
                                alt="/assets/media/logos/menurio-icon.png" class="lazyload lazyloaded">
                            <!---->
                        </div>
                    </div>
                    <div class="p-1 m-1"
                        style="background:rgba(128, 128, 128, 0.757);width:30px;position: absolute;bottom:0;right:0">
                        <font-awesome-icon style="color:black" icon="fa-solid fa-plus" />
                    </div>

                </div>
            </div>
        </div>
    </router-link>
</template>



<style scoped>
.label {
    display: -webkit-inline-box;
    display: -ms-inline-flexbox;
    display: inline-flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    font-size: 0.8rem;
    background-color: #ebedf3;
    color: #3f4254;
    font-weight: 400;
    height: 20px;
    width: 20px;
    font-size: 0.8rem;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 0.42rem;
}

img {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 0.42rem;

    width: 100%;
    max-width: 100px;
    max-height: 100px;

}

.symbol {
    display: inline-block;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    position: relative;
    border-radius: 0.42rem;
}

a{
    text-decoration: none;
}
</style>