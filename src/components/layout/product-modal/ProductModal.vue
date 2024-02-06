<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, onUnmounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../../../stores/basket';
import router from '@/router';
import price from '../../../hooks/price/priceHook.js';
import productAndExtrasData from '../../../http/product/product-api.js';

const api_url = inject('api_url');
const images_url = inject('images_url');
const route = useRoute();
const productId = ref();
const productAndExtras = ref({});

console.log("Product Modal price",price);

const { numberPriceToText } = price();

// const props = defineProps({
//     product_id: Number,
//     title: String,
//     description: String,
//     img_url: String,
//     price: String,
//     addToTheCard: Function,
//     productModalOpenOrClosed: Function,
// })

const closeTheModal = (()=>{
    router.push('../');
});


const product = reactive({
    id: null,
    name: "",
    description: "",
    image: "",
    price: "",
    quantity: 1
})


// modal
const parentDiv = ref(null);
const handleParentClick = (event) => {
    // Check if the clicked element is the parent div
    if (event.target === parentDiv.value) {
        // Your script logic here
        closeTheModal();
        console.log('Parent div clicked');
    }
};

// view more
const isExpanded = ref(false);
const showButton = ref(false);
const contentRef = ref(null);

const checkContentHeight = () => {
    if (contentRef.value) {

        console.log("contentRef.value.scrollHeight > contentRef.value.clientHeight", `${contentRef.value.scrollHeight} > ${contentRef.value.clientHeight}`);
        if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
            showButton.value = true;
        }
    }
};

const expandContent = () => {
    isExpanded.value = true;
    showButton.value = false;
};

onMounted(() => {
    checkContentHeight();
});
// end of view more

const productQuantity = ref(1)

const addQuantityToProduct = () => {
    productQuantity.value++;
}

const subtractQuantityToProduct = () => {
    if (productQuantity.value > 1) {
        productQuantity.value--;

    }
}

const textPriceToNumber = (price) => {

    const replacedPrice = price.replace(",", ".");

    const number = parseFloat(replacedPrice);
    const roundedNumber = Math.round(number * 100) / 100;
    return roundedNumber;
}

const calculateNumberPriceAndQuantity = (price, quantity) => {
    return (price * quantity).toFixed(2).toString().replace(".", ",");

}

const totalProductPrice = computed(() => {
    if(product.price){
        console.log("productModal.price=",product.price);
        return calculateNumberPriceAndQuantity(textPriceToNumber(product.price), productQuantity.value)

    }else{
        return "";
    }
})



const basket = useBasketStore();

const addToBasket = () => {
    const order = {
        product_id: product.id,
        title: product.name,
        extras: {
            sugar: "white"
        },
        price: product.price,
        quantity: productQuantity.value,
        // Other order details...
    };
    console.log();
    basket.addOrder(order);
    closeTheModal();
}

onMounted(async ()=>{

    document.body.classList.add('modal-open');
    // console.log(" route.params= ", route.params);
    productId.value = route.params.product || '';
    // console.log("productId: " + productId.value);
    const { data } = await productAndExtrasData(productId.value);
    productAndExtras.value = data.data[0];
    console.log("productAndExtras=",productAndExtras.value);

    product.id = productAndExtras.value.id;
    product.name = productAndExtras.value.name;
    product.description = productAndExtras.value.description;
    product.image = productAndExtras.value.image;
    product.price = productAndExtras.value.price;


})

onUnmounted(() => {
    document.body.classList.remove('modal-open');

})

</script>
<template>
    <div ref="parentDiv" @click="handleParentClick" class="modal d-block " id="exampleModal" tabindex="-1"
        aria-labelledby="exampleModalLabel">
        <div class="modal-dialog m-auto modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
            <div class="modal-content position-relative" style="background-color:rgb(247, 247, 247)">
                <!-- header -->
                <div class="modal-header p-0 position-sticky top-0 end-0 " style="z-index:1">

                        <div @click="closeTheModal" class="close "><font-awesome-icon icon="fa-solid fa-xmark" />
                        </div>


                </div>
                <!-- body -->
                <div class="modal-body p-0">
                    <div class="card">
                        <img v-if="productAndExtras.image" :src="images_url +'products/'+ productAndExtras.image" class="card-img-top" alt="alt image">
                        <div class="card-body">
                            <h5 v-if="productAndExtras.name" class="card-title fw-bold text-start ">{{ productAndExtras.name }}
                            </h5>
                            <div v-if="productAndExtras.description">
                                <p ref="contentRef" class="card-text text-start pb-0 mb-0 description "
                                    old-class="hideExtraTextInDescription ? 'limitDescriptionCharacters pb-0 mb-0' : ''"
                                    :class="{ 'expanded pb-0 mb-0': isExpanded }" style="color:rgb(155, 155, 155)">{{
                                        productAndExtras.description }}</p>
                                <p v-if="showButton" @click="expandContent" class="text-start fw-bold learn-more pb-0 mb-0">
                                    Μάθε περισσότερα</p>
                            </div>
                            <p v-if="productAndExtras.price" class="text-start fw-bold m-1">{{ numberPriceToText(productAndExtras.price) }}€</p>

                        </div>
                    </div>
                </div>
                <!-- footer -->
                <div class="modal-footer position-sticky bottom-0 end-0 bg-white" style="z-index:1">
                    <div class="container">
                        <div class="row align-items-center">
                            <div class="col-6">
                                <div class="input-group">
                                    <span @click="subtractQuantityToProduct"
                                        class="input-group-text plusAndMinusButton"><font-awesome-icon
                                            icon="fa-solid fa-minus" /></span>
                                    <span class="input-group-text bg-white">{{ productQuantity }}</span>
                                    <span @click="addQuantityToProduct"
                                        class="input-group-text plusAndMinusButton"><font-awesome-icon
                                            icon="fa-solid fa-plus" /></span>

                                </div>
                            </div>
                            <div class="col-6">
                                <button v-if="totalProductPrice" @click="addToBasket" class="btn btn-success btn-sm add">Προσθήκη <b
                                        >{{
                                            totalProductPrice }}€</b></button>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
</template>


<style scoped>
/* view more */
.description {
    max-height: 3em;
    overflow: hidden;
}

.description.expanded {
    max-height: none;
}

/* .learn-more {
  display: none;
} */

.description.expanded button {
    display: block;
}

/* end of view more */

.plusAndMinusButton {
    font-size: 10px;
    cursor: pointer;
}

.learn-more {
    color: rgb(155, 155, 155);
    cursor: pointer;
}

.close {
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



.add {

    height: 38px;
    border-radius: 4px;
    /* margin-left: 40px;
    padding-right: 22px;
    padding-left: 20px; */
}

.limitDescriptionCharacters {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}


.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #8bbafe;
    outline: 0;
    box-shadow: none;
}

a {
    text-decoration: none;
}
</style>