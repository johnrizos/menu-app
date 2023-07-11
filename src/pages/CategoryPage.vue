<script setup>
// import { json } from 'body-parser';
// import FooterCategory from '../components/layout/FooterCategory.vue';
import HeaderCategory from '../components/layout/HeaderCategory.vue';
import SingleCategorySection from '../components/layout/category-page-components/SingleCategorySection.vue';
import { reactive, ref, computed, onBeforeMount, inject, watch } from 'vue';
import { useRoute } from 'vue-router';
import BasketCtaSectionFooter from '../components/layout/BasketCtaSectionFooter.vue'

import ProductModal from '@/components/layout/product-modal/ProductModal.vue';
import { useBasketStore } from '../stores/basket';

const basketStore = useBasketStore();
const api_url = inject('api_url');
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


// test
// const product = reactive({
//     product_id: 1,
//     title: "Ελληνικός μονός",
//     description: "O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής.O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας ΑφρικήςO Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής",
//     img_url: "http://localhost/menu/api/images/products/6475b39226d34951cb70767239394d2208f47a5995d38.jpg",
//     price: "1,75",
//     quantity:1
// })

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

console.log("result=",result[0]);
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
const route = useRoute();

const categoryId = ref('');
const productId = ref('');
let subCategories = ref({});
const errorMessage = ref('');

// Computed
const randomId = computed(() => {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
})


// Methods
 function getSingleCategoryData(id) {
    // id = 1;
    let settings = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: id })
    }
    {
            // id = 1;
            fetch(api_url + 'ajax/post/single-category-page.php', settings)
                .then((response) => response.json())
                .then((data) => {
                    const results = data;
                    console.log("results", results);
                    subCategories.value = results;
                    console.log("subCategories", subCategories);
                    if(subCategories.value.length <= 0){
                        // log.error("subCategories",subCategories)
                        errorMessage.value = "Δεν υπάρχουν κατηγορίες";
                    }
                    // this.displayCategories = true;

                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
};

const getProducts = (()=> {
               fetch(api_url + 'ajax/get/show-products.php')
                .then((response) => response.json())
                .then((data) => {
                    const results = data;
                    console.log("results", results);
                    products.value = results;
                    console.log("products", products);
                    if(products.value.length <= 0){
                        console.log("products <= 0");

                        // errorMessage = "Δεν υπάρχουν κατηγορίες";
                    }
                    // this.displayCategories = true;

                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        
});



// Created
onBeforeMount(() => {

console.log(" route.params= ", route.params);
    categoryId.value = route.params.id;
    console.log("categoryId: " + categoryId.value);
    productId.value = route.params.product_id || '';

    // if(productId.value){

    //     console.log("productId: " + productId.value);
    //     updateProductModal(productId.value)
    //     vueModal.value = true

    // }

    getSingleCategoryData(categoryId.value);
    console.log("subCategories.length = ", subCategories.length);
    getProducts();

}
);

</script>

<template>
    <header-category></header-category>
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
 
                <div v-if="(subCategories.length > 0 || Object.keys(subCategories).length > 0)">
                    <single-category-section v-for="category in subCategories" :category="category" :key="category.id" :productModalOpenOrClosed="productModalOpenOrClosed" :updateProductModal="updateProductModal">
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