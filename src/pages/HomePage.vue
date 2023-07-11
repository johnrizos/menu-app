<script setup>
// import FooterCategory from '../components/layout/FooterCategory.vue';
import HeaderCategory from '../components/layout/HeaderCategory.vue';
import PageCard from '../components/layout/home-page-components/PageCard.vue';

import { reactive, onBeforeMount,inject,ref  } from 'vue';


// Data
const categories = ref([]);
const displayCategories = ref(false);
const api_url = inject("api_url")
// Methods
const showCategories = function() {
	fetch(`${api_url}ajax/get/show-pages.php`, {
	})
		.then((response) => response.json())
		.then((data) => {
			const results = [];
			for (const id in data) {
				results.push({ page_id: data[id].page_id,
					magazi_id: data[id].magazi_id,
					page_name: data[id].page_name,
					page_description: data[id].page_description,
					date_created: data[id].date_created })
			}
			console.log("results", results);
			categories.value = results;
			console.log("categories", categories);

			displayCategories.value = true;

		})
		.catch((error) => {
			console.error('There has been a problem with your fetch operation:', error);
		});

}


// Created
onBeforeMount(()=>{
    showCategories();
});



</script>


<template>
    <header-category></header-category>
    <section class="pt-5" >
        <div class="container">
            <div class="row">
                <div v-for="page in categories" :key="page.category_id" class="col-md-6 pb-4 py-0"
                    style="cursor: pointer">
                    {{ page.category_id }}
                    <page-card :key="page.page_id" :id="page.page_id" :headline="page.page_name"
                        :sub_headline="page.page_description" :image="page.image ? page.image:'../../../assets/demo/default/fallback.jpg'"></page-card>
                </div>

            </div>
            <!-- end of row-->
        </div>
    </section>
      <!-- <footer-section></footer-section> -->
</template>



<style>

</style>