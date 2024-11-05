import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";
import price from "@/hooks/price/priceHook";

const { textPriceToNumber, calculateNumberPriceAndQuantity } = price();

export const useBasketStore = defineStore("basket", () => {
  function generateOrderId() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const random = Math.floor(Math.random() * 10000); // Generate a random number
    return `${timestamp}-${random}`; // Combine timestamp and random number
  }

  // Initialize the basket by checking for data in localStorage
  const basket = ref(JSON.parse(localStorage.getItem("basket")) || {});

  function addOrder(order) {
    basket.value[generateOrderId()] = order;
    console.log("order added to basket", order);
    console.log("basket.value", basket.value);
    localStorage.setItem("basket", JSON.stringify(basket.value));
  }

  const removerItem = (orderId) => {
    delete basket.value[orderId];
    localStorage.setItem("basket", JSON.stringify(basket.value));
  };

  const totalQuantityOfProducts = computed(() => {
    let totalQuantity = 0;
    const currentBasket = basket.value;
    Object.keys(currentBasket).forEach((key) => {
      totalQuantity += Number(currentBasket[key].quantity);
    });
    console.log("totalQuantity", totalQuantity);
    return totalQuantity;
  });

  const totalPrice = computed(() => {
    let totalPrice = 0.0;
    const currentBasket = basket.value;
    Object.keys(currentBasket).forEach((key) => {
      totalPrice +=
        textPriceToNumber(currentBasket[key].price) *
        Number(currentBasket[key].quantity);
    });
    return totalPrice.toFixed(2).toString().replace(".", ",");
  });

  // get the value of specific product id fromt the basket the object looks like this {
  //{1730447761498-2050: {
    // "product_id": 1,
    // "extras": {
    //     "1": [
    //         2,
    //         3
    //     ],
    //     "2": [
    //         10
    //     ]
    // },
    // "price": 2.4,
    // "quantity": 1,
    // "extraDetails": "κοφτή να είναι η ζάχαρη"}}

  const getProductById = (productId) => {
    const currentBasket = basket.value;
    let product = {};
    Object.keys(currentBasket).forEach((key) => {
      if (currentBasket[key].product_id === productId) {
        product = currentBasket[key];
      }
    });
    return product;
  };


  const getProductIdFromOrderId = (orderId) => {
    if (!orderId) {
      return;
    }
    if (!basket.value[orderId]) {
      return;
    }
    const currentBasket = basket.value;
    if (!currentBasket[orderId]) {
      return;
    }
    const order = currentBasket[orderId];
    if (!order) {
      return;
    }
    const  productId = order.product_id;
    if (!productId) {
      return;
    }
    
    return productId;
  };


  return { basket, addOrder, totalPrice, totalQuantityOfProducts, removerItem, getProductById,getProductIdFromOrderId };
});
