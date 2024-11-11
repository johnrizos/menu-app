<script setup>
import { ref,watch,onBeforeMount, reactive } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../stores/basket';
import router from '@/router';
import priceHook from '../hooks/price/priceHook.js';
import goBackOrHome from '../hooks/navigation/goBackOrHome.js';
import {productWithGroupOfExtra}  from '@/http/product/product-api.js';
import SingleOrderCart from '../components/layout/basket-page-components/SingleOrderCart.vue';

import validateCreditCard from '../hooks/payment/creditCard/validateCreditCard.js';

const proceedToCheckOut = (() => {
    console.log("proceedToCheckOut works");
    router.push("/checkout");
});


const {textPriceToNumber, calculateNumberPriceAndQuantity, totalProductPrice,priceForExtras} = priceHook();

console.log("test", textPriceToNumber("10,23"));

const basketStore = useBasketStore();
// console.log("basketStore", basketStore.basket);
const basketOrders = reactive({});

async function getBasketOrders() {
//a function which will get the basket orders from localstorage with the use of the basket store and then get the api for each  order and then check if everything workls properly for example the prices and also if exist the extras for each product
  console.log("getBasketOrders works");
  const basket = basketStore.basket;
  const objectOreders = {};
  console.log("basket", basket);

  for (const [key, value] of Object.entries(basket)) {
    console.log("key", key);
    console.log("value", value);
    console.log("value id", value.product_id);
    const product = await productWithGroupOfExtra(value.product_id);
    console.log("product", product);
    
    const productGroupOfExtra = product["product_group_of_extra"] ?? [];
    console.log("productGroupOfExtra", productGroupOfExtra);

    console.log("basket.extras", value.extras);
    
    const price = totalProductPrice(textPriceToNumber(product.price) + priceForExtras(productGroupOfExtra,value.extras ?? null), value.quantity);
    console.log("price", price);
    
    console.log("product", product);
    if (product) {
      const productOrder = {
        id: product.id,
        title: product.name,
        price: price,
        quantity: value.quantity,
        extras: product.extras
      }
      if (!objectOreders[key]) {
        objectOreders[key] = [];
      }
      objectOreders[key] = productOrder;
    }
  }
  console.log("objectOreders", objectOreders);
  Object.assign(basketOrders, objectOreders);

  return;
}
getBasketOrders();

// payment form

const cardBrand = ref(null);
const isCreditCardValid = ref(null);
const  cardNumberRef = ref(null)
const  cardNumber = ref(null)
const blurCardNumber = ()=>{
    cardNumber.value = cardNumberRef.value.value;
    console.log("cardNumber = ",cardNumber.value);
}

watch(cardNumber, (newCardNumber, oldCardNumber) => {
console.log("newCardNumber = ",newCardNumber);
console.log(validateCreditCard(newCardNumber));
const validateCreditCardResults =  validateCreditCard(newCardNumber);
cardBrand.value = validateCreditCardResults.cardBrand;
isCreditCardValid.value = validateCreditCardResults.isCreditCardValid;
})
// end of payment form


watch(basketStore, (newValue, oldValue) => {
  console.log("newValue totalQuantityOfProducts", newValue.totalQuantityOfProducts);
  if (newValue.totalQuantityOfProducts === 0) {
   goBackOrHome();
  }
})






onBeforeMount(()=>{
  if(!basketStore.totalQuantityOfProducts || basketStore.totalQuantityOfProducts === 0){
   goBackOrHome();
  }
})

</script>
<template>
    <section class="" style="background-color: #eee;">
        <div class="container p-0 m-0  p-sm-0  position-relative m-auto h-100">
            <div class="card h-custom">
                <div class="card-body my-0 py-0 pt-0">
                    <div class="position-sticky top-0 start-0" style="z-index:100;">
                        <div class="row bg-white p-3 shadow  mb-2 bg-body  rounded d-flex ">

                            <div class="col-1">
                                <div @click="goBackOrHome" class="d-flex justify-content-start"><font-awesome-icon
                                        icon="fa-solid fa-angle-left" /></div>
                            </div>
                            <div class="col-10">
                                <div class="d-flex justify-content-center">Πληρωμή</div>

                            </div>
                        </div>
                    </div>
          <!-- products -->
          <div class="mt-4" style="">
              <!--  -->
              <SingleOrderCart  v-for=" ([key, value]) in Object.entries(basketOrders)" :value="value" :key="key" :orderID="key" :clickHandlerItem="null" :removerItem="null" />
          </div>
          <!--end of products -->

                </div>
                <!-- payment-->
                <section v-if="basketStore.totalQuantityOfProducts > 0">


                    <form class="card p-2">
                        <div class="input-group">
                            <input type="text" class="form-control" placeholder="Promo code">
                            <button type="submit" class="btn btn-secondary">Redeem</button>
                        </div>
                    </form>



                    <div class="container d-flex justify-content-center mt-5 mb-5">



                        <div class="row g-3">

                            <div class="col">

                                <span>Μέθοδος πληρωμής</span>
                                <div class="card">

                                    <div class="accordion" id="accordionExample">

                                        <div class="card">
                                            <div class="card-header p-0" id="headingTwo">
                                                <h2 class="mb-0">
                                                    <button
                                                        class="btn btn-light btn-block text-left collapsed p-3 rounded-0 border-bottom-custom"
                                                        type="button" data-toggle="collapse" data-target="#collapseTwo"
                                                        aria-expanded="false" aria-controls="collapseTwo">
                                                        <div class="d-flex align-items-center justify-content-between">

                                                            <span>Paypal</span>
                                                            <img src="https://i.imgur.com/7kQEsHU.png" width="30">

                                                        </div>
                                                    </button>
                                                </h2>
                                            </div>
                                            <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
                                                data-parent="#accordionExample">
                                                <div class="card-body">
                                                    <input type="text" class="form-control" placeholder="Paypal email">
                                                </div>
                                            </div>
                                        </div>

                                        <div class="card">
                                            <div class="card-header p-0">
                                                <h2 class="mb-0">
                                                    <button class="btn btn-light btn-block text-left p-3 rounded-0"
                                                        data-toggle="collapse" data-target="#collapseOne"
                                                        aria-expanded="true" aria-controls="collapseOne">
                                                        <div class="d-flex align-items-center justify-content-between">

                                                            <span>Credit card</span>
                                                            <div class="icons">
                                                                <img src="https://i.imgur.com/2ISgYja.png" width="30">
                                                                <img src="https://i.imgur.com/W1vtnOV.png" width="30">
                                                                <img src="https://i.imgur.com/35tC99g.png" width="30">
                                                                <img src="https://i.imgur.com/2ISgYja.png" width="30">
                                                            </div>

                                                        </div>
                                                    </button>
                                                </h2>
                                            </div>

                                            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne"
                                                data-parent="#accordionExample">
                                                <div class="card-body payment-card-body">

                                                    <span  class="font-weight-normal card-text">Card Number</span>
                                                    <div class="input">

                                                        <i class="fa fa-credit-card"></i>
                                                        <input @blur="blurCardNumber" ref="cardNumberRef" type="text" class="form-control"
                                                            placeholder="0000 0000 0000 0000">

                                                    </div>
                                                    <span v-if="cardBrand">{{ cardBrand }}</span>
                                                    <span v-if="isCreditCardValid != null && isCreditCardValid === false "> - Μη έγκυρος αριθμός πιστωτικής κάρτας.</span>

                                                    <div class="row mt-3 mb-3">

                                                        <div class="col-md-6">

                                                            <span class="font-weight-normal card-text">Expiry Date</span>
                                                            <div class="input">

                                                                <i class="fa fa-calendar"></i>
                                                                <input type="text" class="form-control" placeholder="MM/YY">

                                                            </div>

                                                        </div>


                                                        <div class="col-md-6">

                                                            <span class="font-weight-normal card-text">CVC/CVV</span>
                                                            <div class="input">

                                                                <i class="fa fa-lock"></i>
                                                                <input type="text" class="form-control" placeholder="000">

                                                            </div>

                                                        </div>


                                                    </div>

                                                    <span class="text-muted certificate-text"><i class="fa fa-lock"></i>
                                                        Your
                                                        transaction is secured with ssl certificate</span>

                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <!-- <div class="col-md-6">
      <span>Summary</span>

      <div class="card">

        <div class="d-flex justify-content-between p-3">

          <div class="d-flex flex-column">

            <span>Pro(Billed Monthly) <i class="fa fa-caret-down"></i></span>
            <a href="#" class="billing">Save 20% with annual billing</a>
            
          </div>

          <div class="mt-1">
            <sup class="super-price">$9.99</sup>
            <span class="super-month">/Month</span>
          </div>
          
        </div>

        <hr class="mt-0 line">

        <div class="p-3">

          <div class="d-flex justify-content-between mb-2">

            <span>Refferal Bonouses</span>
            <span>-$2.00</span>
            
          </div>

          <div class="d-flex justify-content-between">

            <span>Vat <i class="fa fa-clock-o"></i></span>
            <span>-20%</span>
            
          </div>
          

        </div>

        <hr class="mt-0 line">


        <div class="p-3 d-flex justify-content-between">

          <div class="d-flex flex-column">

            <span>Today you pay(US Dollars)</span>
            <small>After 30 days $9.59</small>
            
          </div>
          <span>$0</span>

          

        </div>


        <div class="p-3">

        <button class="btn btn-primary btn-block free-button">Try it free for 30 days</button> 
       <div class="text-center">
         <a href="#">Have a promo code?</a>
       </div>
          
        </div>



        
      </div>
  </div> -->

                        </div>


                    </div>
                </section>
                <!-- end of payment -->
                <!-- footer  -->
                <div v-if="basketStore.totalQuantityOfProducts > 0"
                    class="position-fixed  bottom-0 start-50 translate-middle-x checkout-cta" style="width:100%;">
                    <div class="card w-100 m-auto">
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <button @click="proceedToCheckOut" class="btn btn-success fw-bold btn py-2" type="button">
                                    <div class="d-flex justify-content-between">
                                        <div><span class="badge bg-white text-dark mx-2">{{
                                            basketStore.totalQuantityOfProducts }}</span>
                                        </div>
                                        <div> Ολοκλήρωση Πληρωμής </div>
                                        <div>{{ basketStore.totalPrice }}€</div>

                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>


<style  scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");

.h-custom {
    min-height: calc(100vh - 40px);
}

@media (min-width: 1025px) {
    .h-custom {
        min-height: calc(100vh - 40px);
    }
}

.checkout-cta {
    max-width: 450px;


}

/* new credite card */




body {
    background-color: #f5eee7;
    font-family: "Poppins", sans-serif;
    font-weight: 300;
}

.container {

    height: 100vh;

}

/* .card-payment {

    border: none;
} */

.card-header {
    padding: .5rem 1rem;
    margin-bottom: 0;
    background-color: rgba(0, 0, 0, .03);
    border-bottom: none;
}

.btn-light:focus {
    color: #212529;
    background-color: #e2e6ea;
    border-color: #dae0e5;
    box-shadow: 0 0 0 0.2rem rgba(216, 217, 219, .5);
}

.form-control {

    height: 50px;
    border: 2px solid #eee;
    border-radius: 6px;
    font-size: 14px;
}

.form-control:focus {
    color: #495057;
    background-color: #fff;
    border-color: #039be5;
    outline: 0;
    box-shadow: none;

}

.input {

    position: relative;
}

.input i {

    position: absolute;
    top: 16px;
    left: 11px;
    color: #989898;
}

.input input {

    text-indent: 25px;
}

.card-text {

    font-size: 13px;
    margin-left: 6px;
}

.certificate-text {

    font-size: 12px;
}


.billing {
    font-size: 11px;
}

.super-price {

    top: 0px;
    font-size: 22px;
}

.super-month {

    font-size: 11px;
}


.line {
    color: #bfbdbd;
}

.free-button {

    background: #1565c0;
    height: 52px;
    font-size: 15px;
    border-radius: 8px;
}


.payment-card-body {

    flex: 1 1 auto;
    padding: 24px 1rem !important;

}</style>