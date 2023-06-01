<template>
    <header-category></header-category>
    <div data-v-4feccd92="" class="container">
        <div data-v-4feccd92="" id="kt_subheader" class="subheader py-2 py-lg-4 subheader-transparent">
            <div data-v-4feccd92=""
                class="container d-flex align-items-center justify-content-between flex-wrap flex-sm-nowrap">
                <router-link class="back" to="/category">
                    <div data-v-4feccd92="" class="d-flex align-items-baseline flex-wrap mb-5" style="cursor: pointer;">
                        <i data-v-4feccd92="" class="fas fa-arrow-left me-2"></i>
                        back
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

                <div v-else class="text-center"><h2>{{ errorMessage }}</h2></div>
                <!-- <single-category-section  :category="categories"  ></single-category-section> -->


            </div>
            <!---->
        </div>
    </div>
    <footer-category></footer-category>
</template>

<script>
// import { json } from 'body-parser';
import FooterCategory from '../sections/FooterCategory.vue';
import HeaderCategory from '../sections/HeaderCategory.vue';
import SingleCategorySection from './sections/SingleCategorySection.vue'
export default {
    components: { SingleCategorySection, HeaderCategory, FooterCategory },
    inject:["api_url","images_url"],
    data() {
        return {
            categoryId: "",
            subCategories: {},
            errorMessage:""

        }
    },
    methods: {
        getSingleCategoryData(id) {
            // id = 1;
            fetch(this.api_url + 'ajax/post/single-category-page.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id: id })
            })
                .then((response) => response.json())
                .then((data) => {
                    // const results = {};
                    // for (const id in data) {
                    //     results.push({ category_id: data[id].category_id, magazi_id: data[id].magazi_id, category_name: data[id].category_name, category_description: data[id].category_description, date_created: data[id].date_created })
                    // }
                    // const results = JSON.parse(data);
                    const results = data;

                    console.log("results", results);
                    this.subCategories = results;
                    console.log("this.subCategories", this.subCategories);
                    if(this.subCategories.length <= 0){
                        // log.error("subCategories",this.subCategories)
                        this.errorMessage = "Δεν υπάρχουν κατηγορίες";
                    }
                    // this.displayCategories = true;

                })
                .catch((error) => {
                    console.error('There has been a problem with your fetch operation:', error);
                });
        }
    },
    computed: {
        randomId() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
    },
    created() {
        this.categoryId = this.$route.params.id;
        this.getSingleCategoryData(this.categoryId);
    }


}
</script>

<style scoped>
.back {
    color: #2c3e50;
    text-decoration: none;
}
</style>