<template>
  <div>
    <input v-model.number="amountInEuros" type="number" placeholder="Enter amount in Euros" />
    <button @click="redirectToCheckout">Checkout</button>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
import { ref } from "vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  setup() {
    const errorMessage = ref("");
    const amountInEuros = ref(12); // Default value in Euros
    const stripePromise = loadStripe("pk_test_51QJxckCu0CKeNmiWNwctclirVR5A2tYKFT3eqe3FptOfiJxJd9qNzQYHhTaGE4pceUUbEGuf0Z8ukXZuE8NkiHxq009kkuyeye");

    const redirectToCheckout = async () => {
      const stripe = await stripePromise;

      try {
        // Convert amount from Euros to cents
        const amountInCents = Math.round(amountInEuros.value * 100);

        const response = await fetch("http://127.0.0.1:8000/api/create-checkout-session", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount: amountInCents }), // Send amount in cents
        });

        const session = await response.json();

        if (session.error) {
          errorMessage.value = session.error;
        } else {
          await stripe.redirectToCheckout({ sessionId: session.id });
        }
      } catch (error) {
        errorMessage.value = "An error occurred. Please try again.";
      }
    };

    return {
      redirectToCheckout,
      errorMessage,
      amountInEuros,
    };
  },
};
</script>

<style scoped>
.error {
  color: red;
}
</style>
