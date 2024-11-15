<template>
  <div class="container my-4">
    <h3 class="mb-4">Enter Payment Details</h3>
    <form @submit.prevent="handleSubmit">
      <div class="mb-3">
        <label class="form-label">Card Number</label>
        <div class="input-group">
          <span class="input-group-text">
            <i v-if="cardBrand === 'visa'" class="fab fa-cc-visa"></i>
            <i v-else-if="cardBrand === 'mastercard'" class="fab fa-cc-mastercard"></i>
            <i v-else-if="cardBrand === 'amex'" class="fab fa-cc-amex"></i>
            <i v-else-if="cardBrand === 'discover'" class="fab fa-cc-discover"></i>
            <i v-else class="fas fa-credit-card"></i>
          </span>
          <div id="card-number-element" class="form-control stripe-element"></div>
        </div>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <label class="form-label">Expiration Date</label>
          <div class="input-group">
            <span class="input-group-text"><i class="fas fa-calendar-alt"></i></span>
            <div id="card-expiry-element" class="form-control stripe-element"></div>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <label class="form-label">CVC</label>
          <div class="input-group">
            <span class="input-group-text"><i class="fas fa-lock"></i></span>
            <div id="card-cvc-element" class="form-control stripe-element"></div>
          </div>
        </div>
      </div>

      <button type="submit" class="btn btn-primary w-100">Pay €{{ amountInEuros }}</button>
    </form>

    <div v-if="errorMessage" class="alert alert-danger mt-3">{{ errorMessage }}</div>
    <div v-if="successMessage" class="alert alert-success mt-3">{{ successMessage }}</div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { loadStripe } from "@stripe/stripe-js";

export default {
  setup() {
    const amountInEuros = ref(12);
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

      // Create the card number element with change listener for brand detection
      cardNumberElement = elements.create("cardNumber", { style });
      cardNumberElement.mount("#card-number-element");
      cardNumberElement.on("change", (event) => {
        // Update the card brand based on the detected brand from Stripe
        cardBrand.value = event.brand;
      });

      // Create the card expiry and card CVC elements
      cardExpiryElement = elements.create("cardExpiry", { style });
      cardExpiryElement.mount("#card-expiry-element");

      cardCvcElement = elements.create("cardCvc", { style });
      cardCvcElement.mount("#card-cvc-element");
    });

    const handleSubmit = async () => {
      errorMessage.value = "";
      successMessage.value = "";
      try {
        const { paymentMethod, error } = await stripe.createPaymentMethod({
          type: "card",
          card: cardNumberElement,
        });

        if (error) {
          errorMessage.value = error.message;
        } else {
          const amountInCents = Math.round(amountInEuros.value * 100);

          // Initial request to create and confirm the PaymentIntent
          let response = await fetch("http://127.0.0.1:8000/api/process-payment", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              paymentMethodId: paymentMethod.id,
              amount: amountInCents,
            }),
          });

          let data = await response.json();

          if (data.success) {
            successMessage.value = "Payment successful!";
          } else if (data.requiresAction) {
            // Handle 3D Secure authentication
            const { error: confirmError } = await stripe.handleCardAction(data.clientSecret);

            if (confirmError) {
              errorMessage.value = "3D Secure authentication failed. Please try again.";
            } else {
              // Second request to confirm the PaymentIntent after 3D Secure
              response = await fetch("http://127.0.0.1:8000/api/process-payment", {
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
              } else {
                errorMessage.value = "Η πληρωμή απέτυχε μετά την 3D Secure. Παρακαλώ προσπαθήστε ξανά.";
              }
            }
          } else {
            errorMessage.value = "Η πληρωμή απέτυχε. " + data.message;
          }
        }
      } catch (error) {
        errorMessage.value = "Παρουσιάστηκε σφάλμα. Παρακαλώ προσπαθήστε ξανά.";
      }

    };




    return {
      amountInEuros,
      errorMessage,
      successMessage,
      handleSubmit,
      cardBrand, // Add cardBrand to the returned properties to make it reactive in the template
    };
  },
};
</script>

<style scoped>
.stripe-element {
  padding: 0.375rem 0.75rem;
  border: none;
  font-size: 16px;
}

.input-group-text {
  background-color: #e9ecef;
  border: 1px solid #ced4da;
  border-right: none;
  color: #495057;
}

.form-control.stripe-element {
  border: 1px solid #ced4da;
  border-radius: 0 0.375rem 0.375rem 0;
}
</style>
