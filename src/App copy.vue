<template>
    <router-view></router-view>
</template>

<script>

function isLocalhost(url) {
  return url.includes('localhost') || url.includes('127.0.0.1');
}

const is_local_host = isLocalhost(window.location.href);

let api_url = "https://api.favour.gr/";
let images_url = "https://api.favour.gr/images/";

if (is_local_host) {
  api_url = "http://localhost/menu/api/"
  images_url = "http://localhost/menu/api/images/"
}

// api_url = "https://api.favour.gr/";

export default {
    name: 'App',
    components: {
    },
    provide: {
        api_url: api_url,
        images_url: images_url

    },
    data() {
        return {
            display: false
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
