import { ref, computed, reactive } from "vue";
import { defineStore } from "pinia";

export const useBasketStore = defineStore("basket", () => {
  function generateOrderId() {
    const timestamp = new Date().getTime(); // Get the current timestamp
    const random = Math.floor(Math.random() * 10000); // Generate a random number

    return `${timestamp}-${random}`; // Combine timestamp and random number
  }
  // const order = {
  //     order_id: generateOrderId(),
  //     product_id: productModal.product_id.value,
  //     extras:{
  //       sugar: "white"
  //     },
  //     quantity: productModal.quantity,
  //     // Other order details...
  //   };
  const basket = ref({});
  //   const doubleCount = computed(() => count.value * 2)

  function addOrder(order) {
    basket.value[generateOrderId()] = order;
    console.log("order added to basket", order);
    console.log("basket.value", basket.value);

    localStorage.setItem("orders", JSON.stringify(basket.value));
  }

  const  removerItem = (orderId)=> {
    delete basket.value[orderId];
    localStorage.setItem("orders", JSON.stringify(basket.value));

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
const totalQuantityOfProducts = computed(() => {
  let totalQuantity = 0;
  const currentBasket = basket.value;
  Object.keys(currentBasket).forEach(key => {
    // console.log(key,currentBasket[key]);
    totalQuantity += Number(currentBasket[key].quantity)
  });
  console.log("totalQuantity",totalQuantity);
  return totalQuantity;
});

  const totalPrice = computed(() => {
    let totalPrice = 0.00;
    // console.log("basket.value",basket.value);
    const currentBasket = basket.value;
    Object.keys(currentBasket).forEach(key => {
      // console.log(key,currentBasket[key]);
            totalPrice += textPriceToNumber(currentBasket[key].price) * Number(currentBasket[key].quantity);
    });

    return totalPrice.toFixed(2).toString().replace(".", ",")
    // return calculateNumberPriceAndQuantity(textPriceToNumber(productModal.price), productQuantity.value)

  });
  return { basket, addOrder,totalPrice,totalQuantityOfProducts,removerItem };
});
