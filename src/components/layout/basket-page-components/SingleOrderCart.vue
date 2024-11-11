<script setup>
import { useRoute } from 'vue-router';

const props = defineProps({
    value: Object,
    orderID: String,
    clickHandlerItem: Function,
    removerItem: Function
});

const route = useRoute();
const isCheckoutPage = route.path.includes('checkout');

const handleRemoverItem = (event) => {
  event.preventDefault();
  event.stopPropagation();
  if (typeof props.removerItem === 'function') {
    props.removerItem(props.orderID);
  }
};
</script>

<template>
  <component
    :is="isCheckoutPage ? 'div' : 'router-link'"
    :to="!isCheckoutPage ? '/basket/product/' + props.orderID : undefined"
    class="text-decoration-none"
  >
    <div class="card mb-3">
      <div :class="isCheckoutPage ? 'card-body p-1 pe-none' : 'card-body p-1 mouse-pointer'">
        <div class="d-flex justify-content-between">
          <div class="d-flex flex-row align-items-center">
            <div>
              <!-- Optional image here -->
            </div>
            <div style="width: 50px;">
              <span class="input-group-text bg-white d-block"
                    style="background-color:rgb(247, 247, 247)!important">
                {{ props.value.quantity }}
              </span>
            </div>
            <div class="ms-3">
              <p class="m-0">{{ props.value.title }}</p>
            </div>
          </div>
          <div class="d-flex flex-row align-items-center">
            <div style="width: 80px;">
              <p class="mb-0">{{ props.value.price }}€</p>
            </div>
            <div v-if="!isCheckoutPage" @click="handleRemoverItem" style="color: #cecece;" class="text-danger pe-2">
              <i class="fas fa-trash-alt" style="font-size: 25px;"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </component>
</template>

<style scoped>
</style>
