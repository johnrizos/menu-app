<template>
    <header-category></header-category>
    <section class="pt-5" style="background-color: #F2F3F7;">
        <div class="container">
            <div class="row">
                <div v-for="page in categories" :key="page.category_id" class="col-md-6 pb-4 py-0"
                    style="cursor: pointer">
                    <category-card :key="page.page_id" :id="page.page_id" :headline="page.page_name"
                        :sub_headline="page.page_description" :image="page.image ? page.image:'../../../assets/demo/default/fallback.jpg'"></category-card>
                </div>

            </div>
            <!-- end of row-->
        </div>
    </section>
    <footer-category></footer-category>
</template>

<script>
import FooterCategory from '../sections/FooterCategory.vue'
import CategoryCard from './card/CategoryCard.vue'
import HeaderCategory from '../sections/HeaderCategory.vue'
export default {
    components: { CategoryCard, FooterCategory, HeaderCategory },
    inject: ["api_url"],
    data() {
        return {
            categories: []
        }
    },
    methods: {
        showCategories() {
            fetch(`${this.api_url}ajax/get/show-pages.php`, {
    })
                .then((response) => response.json())
                .then((data) => {
                    const results = [];
                    for (const id in data) {
                        results.push({ page_id: data[id].page_id, magazi_id: data[id].magazi_id, page_name: data[id].page_name, page_description: data[id].page_description, date_created: data[id].date_created })
                    }
                    console.log("results", results);
                    this.categories = results;
                    console.log("this.dataCategories", this.dataCategories);

                    this.displayCategories = true;

                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });

        }
    },
    created() {
        this.showCategories();

    }
}


</script>

<style>

</style>