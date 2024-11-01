<script setup>
import { ref, watchEffect,  toRefs, watch, reactive, computed  } from "vue";
import price from "../../../../hooks/price/priceHook.js";

const props = defineProps({
  productGroupOfExtras: {
    type: Array,
    required: true,
  },
  initializecheckboxRadioDataInputsWithDefaultValues: {
    type: Function,
    required: true,
  },
  handleCheckboxChange: {
    type: Function,
    required: true,
  },
  checkboxRadioDataInputs: {
    type: Object,
    required: true,
  },
});

//1. I want initial data for the checkboxRadioDataInputs to be an object
// 2. I want to have a computed property that will return an array with all the selected extras
// 3. I want to have a function that will check if the group of extras is visible
// 4. I want to have a watcher for the computed extrasArray
// 5. I want to have a watcher for the productGroupOfExtras

// console.log("props.productGroupOfExtras:", props.productGroupOfExtras.value);
const { numberPriceToText} = price();
const { productGroupOfExtras, handleCheckboxChange } = toRefs(props);
const initializecheckboxRadioDataInputsWithDefaultValues = props.initializecheckboxRadioDataInputsWithDefaultValues;

// const  productGroupOfExtras  = ref([]);
// const  initializecheckboxRadioDataInputsWithDefaultValues = props.initializecheckboxRadioDataInputsWithDefaultValues;
// const  handleCheckboxChange  = props.handleCheckboxChange;
// productGroupOfExtras.value = props.productGroupOfExtras.value || [];

// ---------- variables ---------------
const checkboxRadioDataInputs = reactive(props.checkboxRadioDataInputs );

console.log("checkbox form checkboxRadioDataInputs:", checkboxRadioDataInputs);


// array with all the selected extras
const extrasArray = computed(() => {
  return extractValuesToArray(checkboxRadioDataInputs);
});


// ------- functions ---------

// extract the values from the object to an array
function extractValuesToArray(obj) {
  let finalArray = [];

  // Iterate through the object keys
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // If the value is an array, concatenate it to the final array
      if (Array.isArray(obj[key])) {
        finalArray = finalArray.concat(obj[key]);
      } else {
        // If it's not an array, simply push the value to the final array
        finalArray.push(obj[key]);
      }
    }
  }

  return finalArray;
}

// check if the group of extras is visible 
const checkIfGroupIsVisible = (productGroupOfExtra,extrasArray) => {
  if (productGroupOfExtra.has_parent === 0) {
    return true;
  }
  if(productGroupOfExtra.visible_with_extras.length === 0 || extrasArray.length === 0){
    return false;
  }

for (let i = 0; i < productGroupOfExtra.visible_with_extras.length; i++) {
  // console.log("extrasArray: ", extrasArray);
  // console.log("productGroupOfExtra.visible_with_extras[i]: ", productGroupOfExtra.visible_with_extras[i]);
  // console.log("test: ", extrasArray.includes(productGroupOfExtra.visible_with_extras[i])); 
    if (extrasArray.includes(productGroupOfExtra.visible_with_extras[i])) {
      // console.log("checkIfGroupIsVisible is true");
      return true;
    }
  }
  return false;
};



// -------------- watchers ---------------

watch(checkboxRadioDataInputs, async (newcheckboxRadioDataInputs, oldcheckboxRadioDataInputs) => {
  console.log("newcheckboxRadioDataInputs: ", newcheckboxRadioDataInputs);

});
watch(productGroupOfExtras, async (newData, oldData) => {
  console.log("new props.productGroupOfExtras: ", newData);
  initializecheckboxRadioDataInputsWithDefaultValues();

});

// Watcher for the computed extrasArray
watch(extrasArray, (newExtrasArray) => {
  console.log("extrasArray has changed: ", newExtrasArray);
});
watch(
  () => props.productGroupOfExtras,
  (newData) => {
    console.log("newData", newData);
    productGroupOfExtras.value = newData || [];
    // internalData.value = newData;
  },
  { immediate: true } // Run the watcher immediately to capture any initial value
);


</script>

<template>
  <section v-if="productGroupOfExtras.length > 0" class="w-auto p-2 group-of-extras">
    <template
      v-for="productGroupOfExtra in productGroupOfExtras"
      :key="productGroupOfExtra['product_group_of_extra_id']"
    >
      <div v-if="checkIfGroupIsVisible(productGroupOfExtra,extrasArray) || checkboxRadioDataInputs.hasOwnProperty([productGroupOfExtra['product_group_of_extra_id']])" class="w-auto p-2 radio-group-of-extras">
        <h2>this is id {{ productGroupOfExtra['product_group_of_extra_id'] }} of the group which is {{checkboxRadioDataInputs.hasOwnProperty([productGroupOfExtra['product_group_of_extra_id']])  }} {{ productGroupOfExtra.name }}</h2>
        <div class="form-check p-0">
          <!-- radio type is 0 and Checkbox type is 1  -->
          <div
            v-for="extra in productGroupOfExtra.extras"
            class="bd-highlight mb-1 shadow px-3 bg-body rounded checkbox-success"
            :key="extra.id"
          >
            <label
              class="form-check-label ps-3 bd-highlight pe-1 py-3 d-flex justify-content-start cursor-pointer"
              :for="`item-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                :type="(productGroupOfExtra.type === 1) ? 'checkbox' : 'radio'"
                :id="`item-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
                :value="extra.id"
                :name="`item-${productGroupOfExtra['product_group_of_extra_id']}`"
                @change="(event) => handleCheckboxChange(event, productGroupOfExtra.id)" :checked="extra.id === productGroupOfExtra.default_value"

              />
              <span class="px-2">{{ extra.name }}</span>
              <div v-if="Number(extra.price_adjustment) !== 0" class="ms-auto px-2 bd-highlight">
                {{ numberPriceToText(extra.price_adjustment) }}&nbsp;€
              </div>
            </label>
          </div>

        </div>
      </div>
    </template>
  </section>
  <!-- <pre>{{ checkboxRadioDataInputs }}</pre> -->
</template>

<style scoped>
/* Add your styles here */
</style>
