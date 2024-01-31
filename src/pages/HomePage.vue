<script setup>
// import FooterCategory from '../components/layout/FooterCategory.vue';
import HeaderCategory from '../components/layout/HeaderCategory.vue';
import PageCard from '../components/layout/home-page-components/PageCard.vue';


import { reactive, onMounted, inject,ref  } from 'vue';
// new
import allPages from '../http/pages/pages-api.js';

// Data
const pages = ref([]);
const api_url = inject("api_url")

onMounted(
    async () => {
        const { data } = await allPages();
        console.log("data", data);
        pages.value = data.data;
});


</script>

<template>
    <header-category></header-category>
    <section class="pt-5" >
        <div class="container">
            <div class="row">
                <div v-for="page in pages" :key="page.id" class="col-md-6 pb-4 py-0"
                    style="cursor: pointer">
                    <page-card :key="page.id" :id="page.id" :headline="page.name"
                        :sub_headline="pagedescription" :image="page.image ? page.image:'../../../assets/demo/default/fallback.jpg'"></page-card>
                </div>

            </div>
            <!-- end of row-->
        </div>
    </section>
      <!-- <footer-section></footer-section> -->
</template>



<style>

</style>../http/pages/page-api.js../http/pages/pages-api.js