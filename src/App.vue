<template>
<header></header>
  <section class="pt-5" style="background-color: #F2F3F7;">
    <div class="container">
      <div   class="row">
        <div v-for="category in categories" :key="category.id" class="col-md-6 pb-4 py-0" style="cursor: pointer">
         
          <category-card :key="category.id" :id="category.id" :headline="category.headline" :sub_headline="category.sub_headline" :image="category.image"></category-card>
        </div>

      </div>
      <!-- end of row-->
    </div>
  </section>
</template>

<script>
import CategoryCard from './components/CategoryCard.vue'

export default {
  name: 'App',
  components: {
    CategoryCard
  },
  data() {
    return {
      categories: [
        {
          "id": "1",
          "headline": "Salads - Appetizers",
          "sub_headline": "Salads - Appetizers",
          "image": "salad.png"
        },
        {
          "id": "2",
          "headline": "Seafood",
          "sub_headline": "Fresh fishes",
          "image": "fish.png"
        },
        {
          "id": "3",
          "headline": "Meat",
          "sub_headline": "Everything on the coals",
          "image": "meat.png"
        },
        {
          "id": "4",
          "headline": "Various meals",
          "sub_headline": "Meals",
          "image": "chef.png"

        },
        {
          "id": "5",
          "headline": "Wines",
          "sub_headline": "Wines",
          "image": "wine-bottle.png"
        },
        {
          "id": "6",
          "headline": "Cocktails",
          "sub_headline": "Cocktails",
          "image": "mai-thai.png"
        },
        {
          "id": "7",
          "headline": "Drinks",
          "sub_headline": "drinks",
          "image": "drink.png"
        },
        {
          "id": "8",
          "headline": "Coffee and Beverages",
          "sub_headline": "drinks",
          "image": "coffee.png"
        }
      ]
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

header {
  height: 200px;
  width: 100%;
  background-color: aliceblue;
  background-image: url(./assets/categories/header.jpg);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
</style>
