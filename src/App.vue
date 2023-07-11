<script setup>
import { ref, provide,onBeforeMount } from 'vue';
import FooterSection from './components/layout/FooterSection.vue';
import { useBasketStore } from './stores/basket';


const display = ref('false');
function isLocalhost(url) {
  return url.includes('localhost') || url.includes('127.0.0.1');
}

const is_local_host = isLocalhost(window.location.href);

let api_url = "https://api.trick.gr/";
let images_url = "https://api.trick.gr/images/";

if (is_local_host) {
  api_url = "http://localhost/menu/api/"
  images_url = "http://localhost/menu/api/images/"
}

provide('api_url', api_url)
provide('images_url', images_url)

// api_url = "https://api.trick.gr/";


const  basketStore = useBasketStore();
onBeforeMount(()=>{
  console.log("onBeforeMount works");
console.log("localStorage.getItem() = ",localStorage.getItem("orders"));
  if (localStorage.getItem("orders") && basketStore.basket.value == null) {
    console.log("onBeforeMount store basket works");
        const storedOrder = JSON.parse(localStorage.getItem("orders"));
        basketStore.basket= storedOrder;
    }
});
</script>

<template>
  <div class="wrapper">
    <!-- main -->
    <div class="content">
      <router-view></router-view>
    </div>
    <!-- end of main -->
      <footer-section></footer-section>
  </div>
</template>





<style >
html,
body {
  height: 100%;
}

.content{
  background-color: #F2F3F7;
  padding-bottom:50px;
  /* overflow: hidden; */
}

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

.wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex: 1;
}
</style>
