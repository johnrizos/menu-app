<script setup>
import { ref, reactive, computed, onMounted, onBeforeMount, onUnmounted, inject } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../../../stores/basket';
import router from '@/router';
import price from '../../../hooks/price/priceHook.js';
import productAndExtrasData from '../../../http/product/product-api.js';
import { parse } from 'vue/compiler-sfc';

// to do 
// 1. check that  the extras is added in the form
    // done a.default extras value was added in the form
// 2. check tha that is hided the child extras
// 3. check that everything added in the form is added in the basket

const images_url = inject('images_url');
const route = useRoute();
const productId = ref();
const productAndExtras = ref({});

const displayForm = () => {
    console.log("formData=", formData.value);
}

// console.log("Product Modal price", price);

const { numberPriceToText, totalProductPrice } = price();

const closeTheModal = (() => {
    router.push('../');
});

const radio = ref({});

const selectedRadio = ref([]);
const selectedCheckbox = ref([]);

// formdata for extras with the values and the text to add a description
const formData = ref({
    "groupOfExtras": {},
    "text": ""
});
// data with all childGroupOfExtras
let selectedChildGroupOfExtraIds = ref([]);

// get the ids from the form data
const getTheIdsfromFormData = () => {
    selectedChildGroupOfExtraIds.value = [];
    const groupOfExtras = formData.value.groupOfExtras;
    console.log("formData=", formData.value);
    for (const key in groupOfExtras) {
        console.log("key=", key);
        if(typeof groupOfExtras[key] === 'object'){
            console.log("groupOfExtras[key]=", groupOfExtras[key]);
            groupOfExtras[key].forEach(valueId => {
                selectedChildGroupOfExtraIds.value.push(valueId);

            });
            for (const value in groupOfExtras[key]) {
            }
        }else{
            selectedChildGroupOfExtraIds.value.push(groupOfExtras[key]);
        }
    }
    console.log("selectedChildGroupOfExtraIds=", selectedChildGroupOfExtraIds.value);
    displayForm();
}

const  hasAtLeastOneCommonValueinArrays = (array1, array2,has_parent) => {
    console.log("it works");
    console.log("array1=", array1);
    console.log("array2=", array2);
    if(!has_parent){
        console.log("!has_parent");
        return true;
    }
    if (!array1 || !array2) {
        console.log("no array1 or array2");
        return false;
    }
    for (let i = 0; i < array1.length; i++) {
        const num1 = parseFloat(array1[i]); // Convert to number
        if (!isNaN(num1)) {
            for (let j = 0; j < array2.length; j++) {
                const num2 = parseFloat(array2[j]); // Convert to number
                if (!isNaN(num2) && num1 === num2) {
                    return true;
                }
            }
        }
    }
    console.log("no common values");
    return false;
}

// product
const product = reactive({
    id: null,
    name: "",
    description: "",
    image: "",
    price: "",
    quantity: 1
})

const productGroupOfExtras = ref({});


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


const totalPrice = computed(() => {
    return totalProductPrice(product.price, productQuantity.value);
});

// onMounted(() => {
//     checkContentHeight();
// });
// end of view more

const productQuantity = ref(1)

const addQuantityToProduct = () => {
    productQuantity.value++;
}

const extrasPrices = ref({});

const subtractQuantityToProduct = () => {
    if (productQuantity.value > 1) {
        productQuantity.value--;

    }
}



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

const displayElement = (e) => {
    // console.log("e.target=", e.target);
    // console.log("e.currentTarget=", e.currentTarget);
    const input = e.currentTarget.querySelector('input');

    // radio
    if (input.type === 'radio') {
        input.checked = true;
        formData.value.groupOfExtras[input.name] = input.value;
    }
    // checkbox 
    if (input.type === 'checkbox') {
        input.checked = !input.checked;
        const ischeckboxChecked = input.checked;


        if (!formData.value.groupOfExtras[input.name]) {
            formData.value.groupOfExtras[input.name] = [];
        }

        if (formData.value.groupOfExtras[input.name])

            if (!ischeckboxChecked) {
                console.log("is not checked");
                formData.value.groupOfExtras[input.name] = formData.value.groupOfExtras[input.name].filter(item => item !== input.value);
            }
            else {
                console.log("is checked");

                formData.value.groupOfExtras[input.name].push(input.value);
            }

        if (formData.value.groupOfExtras[input.name].length === 0) {
            delete formData.value.groupOfExtras[input.name];
        }


    }

    // console.log("formData=", formData.value);
    displayForm();
    getTheIdsfromFormData();
}


const testIfDefaultExist = (defaultValue, value, type, groupId) => {
    if (defaultValue === value) {

        if(type === 0){
            formData.value.groupOfExtras[groupId] = value;
        }else if (type === 1){
            formData.value.groupOfExtras[groupId].push(value);
        }
        console.log(`matches defaultValue ${defaultValue} =  ${value} `);
        getTheIdsfromFormData();
        return true;
    }else{
        console.log(`does not match Value ${defaultValue} !=  ${value}.`);
        getTheIdsfromFormData();
        return false;
    }
}
onMounted(async () => {
    checkContentHeight();
    document.body.classList.add('modal-open');
    // console.log(" route.params= ", route.params);
    productId.value = route.params.product || '';
    // console.log("productId: " + productId.value);
    const { data } = await productAndExtrasData(productId.value);
    console.log("data=", data.data[0]);
    productAndExtras.value = data.data[0];
    console.log("productAndExtras=", productAndExtras.value);

    product.id = productAndExtras.value.id;
    product.name = productAndExtras.value.name;
    product.description = productAndExtras.value.description;
    product.image = productAndExtras.value.image;
    product.price = productAndExtras.value.price;

    productGroupOfExtras.value = productAndExtras.value.product_group_of_extra;
    console.log("productGroupOfExtras=", productGroupOfExtras.value);


})

onUnmounted(() => {
    document.body.classList.remove('modal-open');

})

// example of json product extra dat to add
const jsonExample = {
    1: { extras: [1, 2, 3] },
    2: { extras: [4] },
    3: { extras: [5, 6, 7] },
};




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
                        <img v-if="product.image" :src="images_url + 'products/' + product.image" class="card-img-top"
                            alt="alt image">
                        <div class="card-body">
                            <h5 v-if="product.name" class="card-title fw-bold text-start ">{{ product.name }}
                            </h5>
                            <div v-if="product.description">
                                <p ref="contentRef" class="card-text text-start pb-0 mb-0 description "
                                    old-class="hideExtraTextInDescription ? 'limitDescriptionCharacters pb-0 mb-0' : ''"
                                    :class="{ 'expanded pb-0 mb-0': isExpanded }" style="color:rgb(155, 155, 155)">{{
        product.description }}</p>
                                <p v-if="showButton" @click="expandContent"
                                    class="text-start fw-bold learn-more pb-0 mb-0">
                                    Μάθε περισσότερα</p>
                            </div>
                            <p v-if="product.price" class="text-start fw-bold m-1">{{ numberPriceToText(product.price)
                                }}€
                            </p>

                        </div>
                        <!-- productGroup bootstap 5 radios with options -->

                        <section v-if="productGroupOfExtras" class="w-auto p-3 group-of-extras ">
                        <template v-for="productGroupOfExtra in productGroupOfExtras" :key="productGroupOfExtra.id">
                            <div    v-show="hasAtLeastOneCommonValueinArrays(productGroupOfExtra.visible_with_extras,selectedChildGroupOfExtraIds,productGroupOfExtra.has_parent)" class="w-auto p-4 radio-group-of-extras " >
                            <!-- <div  class="w-auto p-4 radio-group-of-extras " > -->
                                <h2>{{ productGroupOfExtra.name }}</h2>
                                <div class="form-check ">
                                    <div v-for="extra in productGroupOfExtra.extras"
                                        class="d-flex bd-highlight mb-1 shadow p-3  bg-body rounded checkbox-success cursor-pointer"
                                        :key="extra.id" @click.stop.prevent="displayElement">
                                        <label class="form-check-label  px-3 bd-highlight pe-none"
                                            :for="`select-${extra.id}`">
                                            <input 
                                                class="form-check-input px-2 bd-highlight pe-none"
                                                :type="(productGroupOfExtra.type == 0) ? 'radio' : 'checkbox'"
                                                :checked="testIfDefaultExist(productGroupOfExtra['default_value'],extra.id,productGroupOfExtra.type,productGroupOfExtra.id) ? true : false"
                                                :name="productGroupOfExtra.id" :id="`select-${extra.id}`"
                                                :value="extra.id"> {{ extra.name }}
                                        </label>
                                        <div class="ms-auto px-2 bd-highlight">{{ extra.price_adjustment }} €</div>
                                    </div>
                                </div>
                            </div>
                        </template>
                        </section>

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
                                <button v-if="totalPrice" @click="addToBasket"
                                    class="btn btn-success btn-sm add">Προσθήκη <b>{{
                                        totalPrice }}€</b></button>

                            </div>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-backdrop fade show"></div>
</template>


<style>
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


.group-of-extras {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: rgb(244, 244, 244);

}

.radio-group-of-extras {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    /* background-color: white; */
}

.cursor-pointer {
    cursor: pointer
}
</style>