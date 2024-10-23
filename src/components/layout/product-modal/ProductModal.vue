<script setup>
import {
  ref,
  reactive,
  computed,
  onMounted,
  onBeforeMount,
  onUnmounted,
  inject,
} from "vue";
import { useRoute } from "vue-router";
import { useBasketStore } from "../../../stores/basket";
import router from "@/router";
import price from "../../../hooks/price/priceHook.js";
import productAndExtrasData from "../../../http/product/product-api.js";
import { parse } from "vue/compiler-sfc";
import CheckboxRadioProductGroup from "./form/CheckboxRadioProductGroup.vue";

// to do
// 1. check that  the extras is added in the form
// done a.default extras value was added in the form
// 2. check tha that is hided the child extras
// 3. check that everything added in the form is added in the basket

//--------- variables ------------
const images_url = inject("images_url");
const route = useRoute();
const productId = ref();
const productAndExtras = ref({});
const { numberPriceToText, totalProductPrice } = price();
// formdata for extras with the values and the text to add a description
const formData = reactive({
  groupOfExtras: {},
  text: "",
});

// product
const product = reactive({
  id: null,
  name: "",
  description: "",
  image: "",
  price: "",
  quantity: 1,
});

const productGroupOfExtras = ref({});

// modal
const parentDiv = ref(null);

// view more
const isExpanded = ref(false);
const showButton = ref(false);
const contentRef = ref(null);

const extrasPrices = ref({});

const basket = useBasketStore();



const productQuantity = ref(1);
const checkboxRadioDataInputs = reactive({})

const totalPrice = computed(() => {
  let extrasPrice = Number(0.00);
  if (Object.entries(checkboxRadioDataInputs).length !== 0) {
    console.log("checkboxRadioDataInputs: ", checkboxRadioDataInputs);
    
    for (const key in checkboxRadioDataInputs) {
      if (productGroupOfExtras.value.length > 0) {
        console.log("key: ", key);
        productGroupOfExtras.value.forEach(productGroupOfExtra => {
          // console.log(`productGroupOfExtra.id: ${productGroupOfExtra.id} === key: ${key}`);
          // check if the productGroupOfExtra.id is the same as the key of the checkboxRadioDataInputs
          if (Number(productGroupOfExtra.id) === Number(key)) {
            console.log("is the same")
            if (productGroupOfExtra.extras && productGroupOfExtra.extras.length > 0) {
              console.log("key: work properly ", key);
              
              productGroupOfExtra.extras.forEach(extra => {
                console.log("checkboxRadioDataInputs[key]: IS ARRAY:  ", Array.isArray(checkboxRadioDataInputs[key]));
                console.log("checkboxRadioDataInputs[key]: type:  ", typeof checkboxRadioDataInputs[key]);
                console.log("checkboxRadioDataInputs[key]: value:  ", checkboxRadioDataInputs[key]);
                
                 
                if ( checkboxRadioDataInputs[key].includes(Number(extra.id))) {
                  console.log(`extra.price_adjustment):${ Number(extra.id)} === ${ Number(checkboxRadioDataInputs[key])} `, extra.price_adjustment);
                  extrasPrice += Number(extra.price_adjustment);
                  // extrasPrice += Number(extra.price_adjustment).toFixed(2);
                  console.log("extra.price: ", extra.price_adjustment);
                }
              })
            }else{
              console.log("something went wrong with the extras");
              
            }
          }
        }
        )
      }

    }




  }

  console.log("extrasPrice: ", extrasPrice);

  return totalProductPrice(Number(product.price) + Number(extrasPrice), productQuantity.value);
});


// ---------- functions -----------------


const handleParentClick = (event) => {
  // Check if the clicked element is the parent div
  if (event.target === parentDiv.value) {
    // Your script logic here
    closeTheModal();
    console.log("Parent div clicked");
  }
};

const checkContentHeight = () => {
  if (contentRef.value) {
    console.log(
      "contentRef.value.scrollHeight > contentRef.value.clientHeight",
      `${contentRef.value.scrollHeight} > ${contentRef.value.clientHeight}`
    );
    if (contentRef.value.scrollHeight > contentRef.value.clientHeight) {
      showButton.value = true;
    }
  }
};

const expandContent = () => {
  isExpanded.value = true;
  showButton.value = false;
};


const addQuantityToProduct = () => {
  productQuantity.value++;
};

const subtractQuantityToProduct = () => {
  if (productQuantity.value > 1) {
    productQuantity.value--;
  }
};


const addToBasket = () => {
  const order = {
    product_id: product.id,
    title: product.name,
    extras: {
      sugar: "white",
    },
    price: product.price,
    quantity: productQuantity.value,
    // Other order details...
  };
  basket.addOrder(order);
  closeTheModal();
};


// Form submit handler
const handleSubmit = (event) => {
  // Create a FormData object from the form element
  const form = new FormData(event.target);

  // Clear formData before populating
  Object.keys(formData).forEach(key => delete formData[key]);

  // Iterate over FormData entries and populate the reactive formData object
  for (const [key, value] of form.entries()) {
    formData[key] = value;
  }

  // Handle checkboxes separately (FormData API doesn't handle unchecked checkboxes)
  event.target.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    formData[checkbox.name] = checkbox.checked;
  });

  console.log('Form Submitted!', formData);
};

const closeTheModal = () => {
  router.push("../");
};


// initialize the checkboxRadioDataInputs with the default values - Parent
const initializecheckboxRadioDataInputsWithDefaultValues = () => {
  if (!productGroupOfExtras.value) {
    // console.log("productGroupOfExtras.value is empty");
    return;
  }
  if (!productGroupOfExtras.value.length) {
    // console.log("productGroupOfExtras.value.length is empty");
    return;
  }
  productGroupOfExtras.value.forEach((productGroupOfExtra) => {
    if (productGroupOfExtra.default_value) {
      checkboxRadioDataInputs[productGroupOfExtra.id] = [productGroupOfExtra.default_value];
    }
  });
};

// handle the checkbox change - Parent
const handleCheckboxChange = (event, product_group_of_extra_id) => {
  // console.log("product_group_of_extra_id: ", product_group_of_extra_id);
  // console.log("event: ", event.target);
  // console.log("name: ", event.target.name);
  const name = event.target.name;
  const checkboxesSelectors = document.querySelectorAll(`input[name="${name}"]:checked`)
  const checkboxes = [];

  checkboxesSelectors.forEach((checkboxesSelector) => {
    checkboxes.push(Number(checkboxesSelector.value))
  })
  // console.log("Selected checkboxes: ", checkboxes);


  checkboxRadioDataInputs[product_group_of_extra_id] = checkboxes;
  deleteEmptyKeys(checkboxRadioDataInputs);
};

// delete empty keys from the object - Parent
const deleteEmptyKeys = (obj) => {
  for (let key in obj) {
    if (obj[key] === null || obj[key] === undefined || obj[key] === "" || obj[key].length === 0) {
      delete obj[key];
    }
  }
};


// ---------- lifecycle hooks -----------------
onMounted(async () => {
  checkContentHeight();
  document.body.classList.add("modal-open");
  // console.log(" route.params= ", route.params);
  productId.value = route.params.product || "";
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
});

onUnmounted(() => {
  document.body.classList.remove("modal-open");
});


</script>
<template>
  <div ref="parentDiv" @click="handleParentClick" class="modal d-block" id="exampleModal" tabindex="-1"
    aria-labelledby="exampleModalLabel">
    <div class="modal-dialog m-auto modal-dialog-centered modal-dialog-scrollable modal-fullscreen-sm-down">
      <div class="modal-content position-relative" style="background-color: rgb(247, 247, 247)">
        <!-- header -->
        <div class="modal-header p-0 position-sticky top-0 end-0" style="z-index: 1">
          <div @click="closeTheModal" class="close">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </div>
        </div>
        <!-- body -->
        <div class="modal-body p-0">
          <div class="card">
            <img v-if="product.image" :src="images_url + 'products/' + product.image" class="card-img-top"
              alt="alt image" />
            <div class="card-body">
              <h5 v-if="product.name" class="card-title fw-bold text-start">
                {{ product.name }}
              </h5>
              <div v-if="product.description">
                <p ref="contentRef" class="card-text text-start pb-0 mb-0 description"
                  old-class="hideExtraTextInDescription ? 'limitDescriptionCharacters pb-0 mb-0' : ''"
                  :class="{ 'expanded pb-0 mb-0': isExpanded }" style="color: rgb(155, 155, 155)">
                  {{ product.description }}
                </p>
                <p v-if="showButton" @click="expandContent" class="text-start fw-bold learn-more pb-0 mb-0">
                  Μάθε περισσότερα
                </p>
              </div>
              <p v-if="product.price" class="text-start fw-bold m-1">
                {{ numberPriceToText(product.price) }}€
              </p>
            </div>
            <form @submit.prevent="handleSubmit">
              <!-- productGroup bootstap 5 radios with options -->
              <CheckboxRadioProductGroup :productGroupOfExtras="productGroupOfExtras"
                :initializecheckboxRadioDataInputsWithDefaultValues="initializecheckboxRadioDataInputsWithDefaultValues"
                :handleCheckboxChange="handleCheckboxChange" :checkboxRadioDataInputs="checkboxRadioDataInputs">
              </CheckboxRadioProductGroup>
            </form>
          </div>
        </div>
        <!-- footer -->
        <div class="modal-footer position-sticky bottom-0 end-0 bg-white p-1" style="z-index: 1">
          <div class="container">
            <div class="row align-items-center">
              <div class="col-6">
                <div class="input-group">
                  <span @click="subtractQuantityToProduct"
                    class="input-group-text plusAndMinusButton"><font-awesome-icon icon="fa-solid fa-minus" /></span>
                  <span class="input-group-text bg-white">{{ productQuantity }}</span>
                  <span @click="addQuantityToProduct" class="input-group-text plusAndMinusButton"><font-awesome-icon
                      icon="fa-solid fa-plus" /></span>
                </div>
              </div>
              <div class="col-6">
                <button v-if="totalPrice" @click="addToBasket" class="btn btn-success btn-sm add">
                  Προσθήκη <b>{{ totalPrice }}€</b>
                </button>
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
  cursor: pointer;
}
</style>
