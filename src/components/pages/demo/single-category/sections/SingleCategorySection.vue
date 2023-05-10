<template>
    <div class="card bg-transparent">
        <section class="card-body bg-info p-0">
            <div class="d-flex flex-row align-items-center p-2">
                <div class="flex-grow-1 flex-shrink-1">
                    <div class="text-dark fw-bold font-size-h3 mb-1 text-start">
                        {{ category.categoryName }}
                    </div>
                    <div class="text-dark-75">

                    </div>
                </div>
                <div v-if="category.img" class="flex-grow-3 flex-shrink-0">
                    <div class="symbol symbol-80">
                        <div class="symbol symbol-100" style="background-color: rgb(107, 144, 255);">
                            <!----> <img width="100" height="100"
                                :src="images_url +'products/' + category.img">

                        </div>
                    </div>
                </div>
            </div>
        </section>
        <single-category-card v-for="product in category.products" :product="product" :key="product.id">
        </single-category-card>
        <!-- <div data-v-75adc2ff="">
            

        </div> -->
    </div>
</template>

<script>
import SingleCategoryCard from './SingleCategoryCard.vue'
export default {
    components: {
        SingleCategoryCard
    },
    props: ["category"],
    inject:["api_url","images_url"],

    created() {
        // console.log("category=",this.category);
    }
}
</script>

<style>

</style>
