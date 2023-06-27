<script setup>
import { ref, provide } from 'vue';
import FooterSection from './components/layout/FooterSection.vue';
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

</script>

<template>
  <div class="wrapper">
    <!-- main -->
    <div class="content pb-1">
      <router-view></router-view>
    </div>
    <!-- end of main -->
    <div class="footer">
      <footer-section></footer-section>
    </div>
  </div>
</template>





<style >
html,
body {
  height: 100%;
}

.content{
  background-color: #F2F3F7;
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
