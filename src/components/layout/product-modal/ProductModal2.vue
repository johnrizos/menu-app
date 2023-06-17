<script setup>
import { ref, reactive } from 'vue';

const props = defineProps({
    title: String,
    description: String,
    image_url: String,
    price: String,
    addToTheCard: Function
})

const product = reactive({
    title: "Ελληνικός μονός",
    description: "O Ελληνικός καφές είναι είδος καφέ που παρασκευάζεται με ψήσιμο, σε μπρίκι, αλεσμένων σε λεπτή σκόνη καβουρντισμένων κόκκων καφέ και ο οποίος πίνεται περισσότερο από κάθε άλλο είδος καφέ σε πολλές περιοχές της ανατολικής Μεσογείου, της Μέσης Ανατολής, των Βαλκανίων και της Βόρειας Αφρικής.",
    img_url: "http://localhost/menu/api/images/products/6475b39226d34951cb70767239394d2208f47a5995d38.jpg",
    price: "2,10",
})
</script>

<template>
    <div class="d-flex justify-content-center align-items-center container px-2">


<div class="card position-relative">
        
        <div class="top d-flex flex-row align-items-center position-sticky" style="z-index:1;width:100%;top:0px;left:0px;">

            <!-- <img src="https://i.imgur.com/nUNhspp.jpg" width="40" class="rounded-circle mr-2">
            <h6 class="mb-0 mr-2">Organics by LaMana</h6>
            <i class="fa fa-opencart"></i> -->
            <div class="close"><font-awesome-icon icon="fa-solid fa-xmark" /></div>
            
            
        </div>

        <div class="middle  position-relative">


            <img :src="product.img_url" width="300" class="mt-3">
            <h5>{{ product.title }}</h5>
            <span>{{  product.description  }}</span>
            <span>{{  product.description  }}</span>


            <span>Each - approx 1.2KG</span>
            

        </div>

        <div class="bottom d-flex flex-row justify-content-center  position-sticky" style="bottom:0px;left:0px;width:100%;">

        <div class="input-group mb-3">
          <span class="input-group-text">+</span>
          <input type="text" class="form-control" value="1">
          <span class="input-group-text">-</span>
        </div>

        <button class="btn btn-success btn-sm add">Add For <b>$1.75</b></button>


            

        </div>



</div>


</div>
</template>


<style  scoped>
body{

background-color: #3289cd;
}

.card{
width: 350px;
max-width: 350px;

border: none;
border-radius: 5px;

}

.close{
    position: absolute;
    right: 1rem;
    top: 1rem;
    cursor: pointer;
    z-index: 1052;
    width: 2rem;
    height: 2rem;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: center;
    justify-content: center;
    background: rgb(255, 255, 255);
    border-radius: 50%;
    color: rgb(155, 155, 155);
}


.container{

height: 100vh;

}

.top{

padding: 18px;
background-color: transparent;
border-top-left-radius: 5px;
border-top-right-radius: 5px;
color: #fff;
}

.middle{

height: 350px;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column !important;
padding: 10px;
}



.bottom{

padding: 10px;
    background: #eee;
    padding-top: 30px;

}


.input-group{

    width: 109px;
}


.add{

    height: 38px;
border-radius: 4px;
margin-left: 40px;
padding-right: 22px;
padding-left: 20px;
}


.form-control:focus {
color: #495057;
background-color: #fff;
border-color: #8bbafe;
outline: 0;
box-shadow: none;
}


</style>