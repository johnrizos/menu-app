<script setup>
// import { json } from 'body-parser';
// import FooterCategory from '../components/layout/FooterCategory.vue';
import HeaderCategory from '../components/layout/HeaderCategory.vue';
import SingleCategorySection from '../components/layout/category-page-components/SingleCategorySection.vue';
import { reactive, ref, computed, onMounted,  inject } from 'vue';
import { useRoute } from 'vue-router';
import BasketCtaSectionFooter from '../components/layout/BasketCtaSectionFooter.vue';

import ProductModal from '@/components/layout/product-modal/ProductModal.vue';
import { useBasketStore } from '../stores/basket';

// new
import allProductCategories from '../http/product-categories/product-categories.js';


// new
const  page = reactive({
    id: null,
    name: "",
    description: "",
    image: "",
});

const pageProductsAndCategories = ref([]);
// end of new
const basketStore = useBasketStore();
const images_url = inject('images_url');

const products = ref([]);
const vueModal = ref(false);

const hideUnhide = ()=>{

}

const productModalOpenOrClosed = ()=>{
    console.log("productModalOpenOrClosed works");
    vueModal.value = !vueModal.value;
    document.body.classList.toggle('modal-open'); // Add or remove class
}

const productModal = reactive({
    product_id: null,
    title: "",
    description: "",
    img_url: "",
    price: "",
    quantity:1
})
const initializeProductModal =()=>{
    productModal.product_id = null,
    productModal.title = "",
    productModal.description = "",
    productModal.img_url = "",
    productModal.price = "",
    productModal.quantity = 1
}
// v-if="product.img" :src="images_url + 'products/' + product.img"
const updateProductModal =(id)=>{
console.log("updateProductModal works");
initializeProductModal();
const result = products.value.filter(product => product.product_id == id);

// console.log("result=",result[0]);
    productModal.product_id = result[0].product_id
    productModal.title = result[0].product_name
    productModal.description = result[0].product_description
    if( result[0].product_image_url){
        productModal.img_url = images_url + 'products/'+ result[0].product_image_url
    }
    productModal.price = result[0].price
    productModalOpenOrClosed()

// productModal
// Expected output: Array ["exuberant", "destruction", "present"]
}

// Data
// const route = useRoute();

const categoryId = ref('');
const productId = ref('');
let subCategories = ref({});
const errorMessage = ref('');

const productCategories = ref([]);

// Computed
const randomId = computed(() => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
})




onMounted(async ()=>{
    const route =  useRoute();
 categoryId.value = route.params.id;

console.log("Category ID:", categoryId.value);
    const { data } = await allProductCategories(categoryId.value);
    console.log("data", data);
    // pageProductsAndCategories.value = data.data[0];
    pageProductsAndCategories.value = data.data;
    
    // console.log("pageProductsAndCategories", pageProductsAndCategories.value);

    page.id =  pageProductsAndCategories.value.id;
    page.name =  pageProductsAndCategories.value.name;
    page.description =  pageProductsAndCategories.value.description;
    page.image =  pageProductsAndCategories.value.image;
    // console.log("page", page);

    productCategories.value = pageProductsAndCategories.value.product_and_categories;
    // console.log("productCategories", productCategories.value);



    // })

})

</script>

<template>
    <header-category></header-category>
    <!-- Page name:{{ page.name }} -->
    <div data-v-4feccd92="" class="container">
        <div data-v-4feccd92="" id="kt_subheader" class="subheader py-2 py-lg-4 subheader-transparent">
            <div data-v-4feccd92=""
                class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <router-link class="back" to="/">
                    <div data-v-4feccd92="" class="d-flex align-items-baseline flex-wrap mb-5" style="cursor: pointer;">
                        <i data-v-4feccd92="" class="fas fa-arrow-left me-2"></i>
                        Πίσω
                    </div>
                </router-link>
            </div>
        </div>
        <!---->
        <!---->
        <div class="mb-10">
            <div>
                <!---->
                <!-- section here -->
 
                <div v-if="(productCategories.length > 0 || Object.keys(productCategories).length > 0)">
                    <single-category-section v-for="productCategory in productCategories" :productCategory="productCategory" :key="productCategory.id" :productModalOpenOrClosed="productModalOpenOrClosed" :updateProductModal="updateProductModal">
                    </single-category-section>
                </div>

                <div v-else class="text-center">
                    <h2>{{ errorMessage }}</h2>
                </div>
                <!-- <single-category-section  :category="categories"  ></single-category-section> -->


            </div>
            <!---->
        </div>
    </div>
    <!-- <product-modal v-if="vueModal" :product_id="productModal.product_id" :title="productModal.title" :description="productModal.description"
        :img_url="productModal.img_url" :price="productModal.price" :addToTheCard="addToTheCard" :productModalOpenOrClosed="productModalOpenOrClosed"
        ></product-modal> -->
        <router-view />
    <!-- <footer-category></footer-category> -->

    <basket-cta-section-footer v-if="basketStore.totalQuantityOfProducts > 0">
    </basket-cta-section-footer>

</template>



<style scoped>
.back {
    color: #2c3e50;
    text-decoration: none;
}
</style>