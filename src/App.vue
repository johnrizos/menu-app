<template>
    <router-view></router-view>
</template>

<script>

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

// api_url = "https://api.trick.gr/";

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

<style >
body {
    background: #f2f3f7 !important;
    background-image: initial;
    background-position-x: initial;
    background-position-y: initial;
    background-size: initial;
    background-repeat-x: initial;
    background-repeat-y: initial;
    background-attachment: initial;
    background-origin: initial;
    background-clip: initial;
    background-color: rgb(242, 243, 247);
}

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /* text-align: center; */
    color: #2c3e50;
    background: #f2f3f7;
}

/* header {
    height: 200px;
    width: 100%;
    background-color: aliceblue;
    background-image: url(./assets/categories/header.jpg);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
} */

.footer {
    padding: 10px;
}

.pb-4,
.py-4 {
    padding-bottom: 1rem !important;
}

.pt-4,
.py-4 {
    padding-top: 1rem !important;
}

.flex-row {
    -webkit-box-orient: horizontal !important;
    -webkit-box-direction: normal !important;
    -ms-flex-direction: row !important;
    flex-direction: row !important;
}

.d-flex {
    display: -webkit-box !important;
    display: -ms-flexbox !important;
    display: flex !important;
}

.bg-white {
    background-color: #ffffff !important;
}

.bg-white {
    background-color: #ffffff !important;
}

* {
    font-family: Roboto, sans-serif;
}

*,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

user agent stylesheet div {
    display: block;
}

.flex-column {
    -webkit-box-orient: vertical !important;
    -webkit-box-direction: normal !important;
    -ms-flex-direction: column !important;
    flex-direction: column !important;
}

:root {
    --swiper-navigation-size: 44px;
}

:root {
    --swiper-theme-color: #007aff;
}

:root {
    --blue: #007bff;
    --indigo: #6610f2;
    --purple: #6f42c1;
    --pink: #e83e8c;
    --red: #dc3545;
    --orange: #fd7e14;
    --yellow: #ffc107;
    --green: #28a745;
    --teal: #20c997;
    --cyan: #17a2b8;
    --white: #ffffff;
    --gray: #7e8299;
    --gray-dark: #3f4254;
    --primary: #3699FF;
    --secondary: #e4e6ef;
    --success: #1bc5bd;
    --info: #8950fc;
    --warning: #ffa800;
    --danger: #f64e60;
    --light: #f3f6f9;
    --dark: #181c32;
    --white: #ffffff;
    --breakpoint-xs: 0;
    --breakpoint-sm: 576px;
    --breakpoint-md: 768px;
    --breakpoint-lg: 992px;
    --breakpoint-xl: 1200px;
    --breakpoint-xxl: 1400px;
    --font-family-sans-serif: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    --font-family-monospace: SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
}

:root {
    --animate-duration: 1s;
    --animate-delay: 1s;
    --animate-repeat: 1;
}

:root {
    --tagify-dd-color-primary: rgb(53, 149, 246);
    --tagify-dd-bg-color: white;
}

html {
    font-family: sans-serif;
    -moz-text-size-adjust: 100%;
    text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

html {
    font-family: sans-serif;
    line-height: 1.15;
    -webkit-text-size-adjust: 100%;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

*,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}

*,
*::before,
*::after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
</style>
