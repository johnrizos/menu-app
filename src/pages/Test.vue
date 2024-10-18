<template>
  <div>
    <h1>{{ product.name }}</h1>
    <!-- Checkbox Groups -->
    <div v-for="productGroupOfExtra in productGroupOfExtras" :key="productGroupOfExtra.id">
      <h2>{{ productGroupOfExtra.name }}</h2>
      <div>
        <div v-for=" extra in productGroupOfExtra.extras" :key="extra.id">
          <label v-if="productGroupOfExtra.type === 1">
            <input :name="`checkbox-${productGroupOfExtra.id}`" type="checkbox" :value="extra.id"
              @change="(event) => handleCheckboxChange(event, productGroupOfExtra.id)">
            Checkbox {{ extra.name }}
          </label>
          <label v-else-if="productGroupOfExtra.type === 0">
            <input :name="`checkbox-${productGroupOfExtra.id}`" type="radio" :value="extra.id"
              @change="(event) => handleCheckboxChange(event, productGroupOfExtra.id)">
            Checkbox {{ extra.name }}
          </label>
        </div>
      </div>
    </div>

    <button @click="submitForm">Submit</button>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed } from 'vue';
import dataJson from '../components/layout/product-modal/form/data.json';



const formData = reactive({})


console.log("formData", formData);



console.log("dataJson", dataJson)
const product = ref([]);
product.value = dataJson[0];
console.log("product:", product.value);
console.log("product.value.product_group_of_extra:", product.value.product_group_of_extra);

const productGroupOfExtras = ref([]);
productGroupOfExtras.value = product.value.product_group_of_extra;
console.log("productGroupOfExtras", productGroupOfExtras.value)

const checkboxSelections = {};

const handleCheckboxChange = (event, product_group_of_extra_id) => {


  console.log("product_group_of_extra_id: ", product_group_of_extra_id);
  console.log("event: ", event.target);
  console.log("name: ", event.target.name);
  const name = event.target.name;
  const checkboxesSelectors = document.querySelectorAll(`input[name="${name}"]:checked`)
  const checkboxes = [];

  checkboxesSelectors.forEach((checkboxesSelector) => {
    checkboxes.push(checkboxesSelector.value)
  })
  console.log("Selected checkboxes: ", checkboxes);


  formData[product_group_of_extra_id] = checkboxes;

};

const submitForm = () => {
  console.log('Checkbox Selections:', checkboxSelections);
};


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


watch(formData, async (newformData, oldformData) => {
  console.log("newformData: ", newformData);

});


const extrasArray = computed(() => {

  return extractValuesToArray(formData);
});

// Watcher for the computed extrasArray
watch(extrasArray, (newExtrasArray) => {
  console.log("extrasArray has changed: ", newExtrasArray);
});
</script>
