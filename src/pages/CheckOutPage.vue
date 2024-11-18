<script setup>
import { ref, watch, onBeforeMount, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useBasketStore } from '../stores/basket';
import router from '@/router';
import priceHook from '../hooks/price/priceHook.js';
import goBackOrHome from '../hooks/navigation/goBackOrHome.js';
import { productWithGroupOfExtra } from '@/http/product/product-api.js';
import SingleOrderCart from '../components/layout/basket-page-components/SingleOrderCart.vue';
import CrediteCartForm from '@/components/layout/check-out-page/CrediteCartForm.vue';
import {backendURL} from '@/http/api.js';

import validateCreditCard from '../hooks/payment/creditCard/validateCreditCard.js';
import { loadStripe } from "@stripe/stripe-js";


// const proceedToCheckOut = (() => {
//     console.log("proceedToCheckOut works");
//     router.push("/checkout");
// });

const returnToHomePage = (() => {
    console.log("returnToHomePage works");
    router.push("/");
});


const { textPriceToNumber, calculateNumberPriceAndQuantity, totalProductPrice, priceForExtras } = priceHook();

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

        const price = totalProductPrice(textPriceToNumber(product.price) + priceForExtras(productGroupOfExtra, value.extras ?? null), value.quantity);
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



// const amountInEuros = ref(12);
const errorMessage = ref("");
const successMessage = ref("");
const cardBrand = ref("generic"); // Initialize with "generic" for default icon
let stripe;
let cardNumberElement, cardExpiryElement, cardCvcElement;

onMounted(async () => {
    stripe = await loadStripe("pk_test_51QJxckCu0CKeNmiWNwctclirVR5A2tYKFT3eqe3FptOfiJxJd9qNzQYHhTaGE4pceUUbEGuf0Z8ukXZuE8NkiHxq009kkuyeye");

    const elements = stripe.elements();

    const style = {
        base: {
            color: "#495057",
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
            fontSize: "16px",
            "::placeholder": {
                color: "#6c757d",
            },
        },
        invalid: {
            color: "#dc3545",
            iconColor: "#dc3545",
        },
    };

    cardNumberElement = elements.create("cardNumber", { style });
    cardNumberElement.mount("#card-number-element");
    cardNumberElement.on("change", (event) => {
        cardBrand.value = event.brand || "generic";
    });

    cardExpiryElement = elements.create("cardExpiry", { style });
    cardExpiryElement.mount("#card-expiry-element");

    cardCvcElement = elements.create("cardCvc", { style });
    cardCvcElement.mount("#card-cvc-element");
});
const handleSubmit = async (event) => {
    event.preventDefault();
    errorMessage.value = "";
    successMessage.value = "";

    try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
            type: "card",
            card: cardNumberElement,
        });

        if (error) {
            errorMessage.value = error.message;
            console.error("Payment method error:", error);
        } else {
            const amountInEuros = textPriceToNumber(basketStore.totalPrice)
            const amountInCents = Math.round(amountInEuros * 100);

            let response = await fetch(`${backendURL}/api/process-payment`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    paymentMethodId: paymentMethod.id,
                    amount: amountInCents,
                }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            let data = await response.json();

            if (data.success) {
                successMessage.value = "Η πληρωμή ολοκληρώθηκε επιτυχώς!";
                basketStore.removeAllItems();
                console.log("basketStore removed?", basketStore.basket);
            } else if (data.requiresAction && data.paymentIntentId) {
                const { error: confirmError } = await stripe.handleCardAction(data.clientSecret);

                if (confirmError) {
                    errorMessage.value = "3D Secure authentication failed. Please try again.";
                } else {
                    response = await fetch(`${backendURL}/api/process-payment`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            paymentIntentId: data.paymentIntentId,
                            amount: amountInCents,
                        }),
                    });

                    data = await response.json();

                    if (data.success) {
                        successMessage.value = "Η πληρωμή ολοκληρώθηκε επιτυχώς!";
                        basketStore.removeAllItems();
                        console.log("basketStore removed?", basketStore.basket);

                    } else {
                        errorMessage.value = "Η πληρωμή απέτυχε μετά την 3D Secure. Παρακαλώ προσπαθήστε ξανά.";
                    }
                }
            } else {
                errorMessage.value = "Η πληρωμή απέτυχε. " + (data.message || "Παρακαλώ δοκιμάστε ξανά.");
            }
        }
    } catch (error) {
        console.error("Error during payment process:", error);
        errorMessage.value = "Παρουσιάστηκε σφάλμα. Παρακαλώ προσπαθήστε ξανά.";
    }
};
// end of stripe bank payment


// watch(basketStore, (newValue, oldValue) => {
//     console.log("newValue totalQuantityOfProducts", newValue.totalQuantityOfProducts);
//     if (newValue.totalQuantityOfProducts === 0) {
//         goBackOrHome();
//     }
// })






onBeforeMount(() => {
    if (!basketStore.totalQuantityOfProducts || basketStore.totalQuantityOfProducts === 0) {
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
                    <div v-if="!successMessage" class="mt-4" style="">
                        <!--  -->
                        <SingleOrderCart v-for=" ([key, value]) in Object.entries(basketOrders)" :value="value"
                            :key="key" :orderID="key" :clickHandlerItem="null" :removerItem="null" />
                    </div>
                    <!--end of products -->

                </div>
                <!-- payment-->
                <section v-if="basketStore.totalQuantityOfProducts > 0">


                    <div class="  justify-content-center mt-1 mb-5">



                        <div class="row g-3 m-0 p-1">

                            <div class="col m-0">

                                <!-- <span>Μέθοδος πληρωμής</span> -->
                                <div class="card p-3">
                                    <h3 v-if="!successMessage" class="mb-4">Enter Payment Details</h3>
                                    <form v-if="!successMessage" @submit.prevent="handleSubmit">
                                        <div class="mb-3">
                                            <label class="form-label">Card Number</label>
                                            <div class="input-group">
                                                <span class="input-group-text">
                                                    <i v-if="cardBrand === 'visa'" class="fab fa-cc-visa"></i>
                                                    <i v-else-if="cardBrand === 'mastercard'"
                                                        class="fab fa-cc-mastercard"></i>
                                                    <i v-else-if="cardBrand === 'amex'" class="fab fa-cc-amex"></i>
                                                    <i v-else-if="cardBrand === 'discover'"
                                                        class="fab fa-cc-discover"></i>
                                                    <i v-else class="fas fa-credit-card"></i>
                                                </span>
                                                <div id="card-number-element" class="form-control stripe-element"></div>
                                            </div>
                                        </div>

                                        <div class="row">
                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">Expiration Date</label>
                                                <div class="input-group">
                                                    <span class="input-group-text"><i
                                                            class="fas fa-calendar-alt"></i></span>
                                                    <div id="card-expiry-element" class="form-control stripe-element">
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="col-md-6 mb-3">
                                                <label class="form-label">CVC</label>
                                                <div class="input-group">
                                                    <span class="input-group-text"><i class="fas fa-lock"></i></span>
                                                    <div id="card-cvc-element" class="form-control stripe-element">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <!-- <button type="submit" class="btn btn-primary w-100">Pay €{{ amountInEuros }}</button> -->
                                    </form>

                                    <!-- if the payment is success -->
                                        <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}
                                        </div>
                                        <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}
                                        </div>
                                        </div>
                            </div>
                        </div>


                    </div>
                </section>
                                     <!-- if the payment is success -->
                                     <div v-if="successMessage" class="p-2">

                                        <div class="alert alert-success mt-3">{{ successMessage }}
                                        </div>
                                        <!-- div to return to home page cta -->
                                        <div> <button class="btn btn-primary"
                                                @click="returnToHomePage">Επιστροφή στην αρχική σελίδα</button></div>
                                    </div>
                                    <!-- end if the payment is success -->
                <!-- end of payment -->
                <!-- footer  -->
                <div v-if="basketStore.totalQuantityOfProducts > 0"
                    class="position-fixed  bottom-0 start-50 translate-middle-x checkout-cta" style="width:100%;">
                    <div class="card w-100 m-auto">
                        <div class="card-body">
                            <div class="d-grid gap-2">
                                <button v-if="!successMessage" @click="handleSubmit"
                                    class="btn btn-success fw-bold btn py-2" type="button">
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


<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:weight@100;200;300;400;500;600;700;800&display=swap");

/* .h-custom {
    min-height: calc(100vh - 40px);
}

@media (min-width: 1025px) {
    .h-custom {
        min-height: calc(100vh - 40px);
    }
} */

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

}
</style>