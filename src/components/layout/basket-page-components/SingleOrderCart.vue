<script setup>
const props = defineProps(
    {
        value: Object,
        orderID: String,
        clickHandlerItem: Function,
        removerItem: Function
    }
);

const removerItem = props.removerItem;

const handleRemoverItem = (event) => {
  event.preventDefault();
  event.stopPropagation(); // Prevent parent click from firing
  props.removerItem(props.orderID); // Pass only the key (orderID) to the parent's removerItem
};

</script>

<template>
        <!-- <router-link :to="'/category/1/product/' + product.id  "> -->
        <router-link :to="'/basket/product/' + props.orderID" class="text-decoration-none">
            <div  class="card mb-3">

                  <div class="card-body p-1  mouse-pointer" @click="clickHandlerItem(key)">
                <div class="d-flex justify-content-between">
                  <div class="d-flex flex-row align-items-center">
                    <div>
                      <!-- <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-shopping-carts/img1.webp"
                            class="img-fluid rounded-3" alt="Shopping item" style="width: 65px;"> -->
                    </div>

                    <div style="width: 50px;">
                      <span class="input-group-text bg-white d-block"
                        style="background-color:rgb(247, 247, 247)!important">{{ props.value.quantity }}</span>
                    </div>
                    <div class="ms-3">
                      <p class="m-0">{{ props.value.title }}</p>
                    </div>
                  </div>
                  <div class="d-flex flex-row align-items-center">


                    <div style="width: 80px;">
                      <p class="mb-0">{{ props.value.price }}€</p>
                    </div>
                    <div @click="handleRemoverItem" style="color: #cecece;" class="text-danger pe-2"><i
                        class="fas fa-trash-alt" style="font-size: 25px;"></i></div>
                  </div>
                </div>
              </div>
              </div>
            </router-link>

</template>



<style  scoped>

</style>