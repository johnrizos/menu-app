<template>
  <div>
    <h1>{{ product.name }}</h1>
    <!-- Checkbox Groups -->
    <template v-for="productGroupOfExtra in productGroupOfExtras" :key="productGroupOfExtra.id">
      
      <div v-if="checkIfGroupIsVisible(productGroupOfExtra,extrasArray)">
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div>
          <!-- all inputs for each group  type 1 is checkbox and 0 radio-->
          <div v-for=" extra in productGroupOfExtra.extras" :key="extra.id">
            <label >
              <input :name="`checkbox-${productGroupOfExtra.id}`" :type="(productGroupOfExtra.type === 1) ? 'checkbox' : 'radio'" :value="extra.id"
                @change="(event) => handleCheckboxChange(event, productGroupOfExtra.id)" :checked="extra.id === productGroupOfExtra.default_value">
              Checkbox {{ extra.name }}
            </label>
            <!-- <label v-else-if="productGroupOfExtra.type === 0">
              <input :name="`checkbox-${productGroupOfExtra.id}`" type="radio" :value="extra.id"
                @change="(event) => handleCheckboxChange(event, productGroupOfExtra.id)" :checked="extra.id === productGroupOfExtra.default_value">
              Checkbox {{ extra.name }}
            </label> -->
          </div>
        </div>
      </div>
    </template>
    <button @click="submitForm">Submit</button>
  </div>
</template>
<script setup>
import { ref, reactive, watch, computed } from 'vue';
import dataJson from '../components/layout/product-modal/form/data.json';



const formData = reactive({})


console.log("formData", formData);

const checkIfGroupIsVisible = (productGroupOfExtra,extrasArray) => {
  if (productGroupOfExtra.has_parent === 0) {
    console.log("checkIfGroupIsVisible is true");
    
    return true;
  }
  if(productGroupOfExtra.visible_with_extras.length === 0 || extrasArray.length === 0){
    console.log("checkIfGroupIsVisible is false 1");

    return false;
  }

for (let i = 0; i < productGroupOfExtra.visible_with_extras.length; i++) {
  console.log("extrasArray: ", extrasArray);
  console.log("productGroupOfExtra.visible_with_extras[i]: ", productGroupOfExtra.visible_with_extras[i]);
  console.log("test: ", extrasArray.includes(productGroupOfExtra.visible_with_extras[i])); 
  
    if (extrasArray.includes(productGroupOfExtra.visible_with_extras[i])) {
      console.log("checkIfGroupIsVisible is true");

      return true;
    }
  }
  console.log("checkIfGroupIsVisible is false 2");

  return false;
};



console.log("dataJson", dataJson)
const product = ref([]);
product.value = dataJson[0];
console.log("product:", product.value);
console.log("product.value.product_group_of_extra:", product.value.product_group_of_extra);

const productGroupOfExtras = ref([]);
productGroupOfExtras.value = product.value.product_group_of_extra;
console.log("productGroupOfExtras", productGroupOfExtras.value)

const checkboxSelections = {};

const initializeFormDataWithDefaultValues = () => {
  productGroupOfExtras.value.forEach((productGroupOfExtra) => {
    if (productGroupOfExtra.default_value) {
      formData[productGroupOfExtra.id] = productGroupOfExtra.default_value;
    }
  });
};

initializeFormDataWithDefaultValues();
console.log("formData", formData);


const handleCheckboxChange = (event, product_group_of_extra_id) => {
  console.log("product_group_of_extra_id: ", product_group_of_extra_id);
  console.log("event: ", event.target);
  console.log("name: ", event.target.name);
  const name = event.target.name;
  const checkboxesSelectors = document.querySelectorAll(`input[name="${name}"]:checked`)
  const checkboxes = [];

  checkboxesSelectors.forEach((checkboxesSelector) => {
    checkboxes.push(Number(checkboxesSelector.value))
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

// array with all the selected extras
const extrasArray = computed(() => {

  return extractValuesToArray(formData);
});

// Watcher for the computed extrasArray
watch(extrasArray, (newExtrasArray) => {
  console.log("extrasArray has changed: ", newExtrasArray);
});
</script>
