<script setup>
// import { json } from 'body-parser';
import FooterCategory from '../components/layout/FooterCategory.vue';
import HeaderCategory from '../components/layout/HeaderCategory.vue';
import SingleCategorySection from '../components/layout/category-page-components/SingleCategorySection.vue'
import { reactive, ref, computed, onBeforeMount, inject, watch } from 'vue';
import { useRoute } from 'vue-router'



// Data
const route = useRoute();
const api_url = inject("api_url")

const categoryId = ref('');
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
                        errorMessage = "Δεν υπάρχουν κατηγορίες";
                    }
                    // this.displayCategories = true;

                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
};



// Created
onBeforeMount(() => {


    categoryId.value = route.params.id;
    console.log("categoryId: " + categoryId.value);
    getSingleCategoryData(categoryId.value);
    console.log("subCategories.length = ", subCategories.length);

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
                    <single-category-section v-for="category in subCategories" :category="category" :key="category.id">
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
    <footer-category></footer-category>
</template>



<style scoped>
.back {
    color: #2c3e50;
    text-decoration: none;
}
</style>