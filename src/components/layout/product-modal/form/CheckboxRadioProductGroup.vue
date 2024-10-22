<script setup>
import { ref, watchEffect,  toRefs, watch, reactive, computed  } from "vue";

const props = defineProps({
  productGroupOfExtras: {
    type: Array,
    required: true,
  },
  selectedChildGroupOfExtraIds: {
    type: Array,
    required: false,
  },
  testIfDefaultExist: {
    type: Function,
    required: false,
  },
  displayElement: {
    type: Function,
    required: false,
  },
});

console.log("props.productGroupOfExtras:", props.productGroupOfExtras.value);
const  productGroupOfExtras  = ref([]);
productGroupOfExtras.value = props.productGroupOfExtras.value;

// variables
const formData = reactive({})

// array with all the selected extras
const extrasArray = computed(() => {

return extractValuesToArray(formData);
});



// functions
const initializeFormDataWithDefaultValues = () => {
  if(!productGroupOfExtras.value){
    console.log("productGroupOfExtras.value is empty");
    return;
  }
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


watch(formData, async (newformData, oldformData) => {
  console.log("newformData: ", newformData);

});

// Watcher for the computed extrasArray
watch(extrasArray, (newExtrasArray) => {
  console.log("extrasArray has changed: ", newExtrasArray);
});
watch(
  () => props.productGroupOfExtras,
  (newData) => {
    console.log("newData", newData);
    productGroupOfExtras.value = newData;
    // internalData.value = newData;
  },
  { immediate: true } // Run the watcher immediately to capture any initial value
);


</script>

<template>
  <section v-if="productGroupOfExtras.length > 0" class="w-auto p-3 group-of-extras">
    <template
      v-for="productGroupOfExtra in productGroupOfExtras"
      :key="productGroupOfExtra['product_group_of_extra_id']"
    >
      <div v-if="checkIfGroupIsVisible(productGroupOfExtra,extrasArray)" class="w-auto p-4 radio-group-of-extras">
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div class="form-check">
          <!-- radio type is 0 and Checkbox type is 1  -->
          <div
            v-for="extra in productGroupOfExtra.extras"
            class="bd-highlight mb-1 shadow px-3 bg-body rounded checkbox-success"
            :key="extra.id"
          >
            <label
              class="form-check-label ps-3 bd-highlight pe-1 py-3 d-flex justify-content-between cursor-pointer"
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
                <!-- v-model="checkboxValues[productGroupOfExtra['product_group_of_extra_id']][extra.id]" -->
              <span class="px-2">{{ extra.name }}</span>
              <div class="ms-auto px-2 bd-highlight">
                {{ extra.price_adjustment }}&nbsp;€
              </div>
            </label>
          </div>
          <!-- Radio -->
          <!-- <div
            v-if="productGroupOfExtra.type == 0"
            v-for="extra in productGroupOfExtra.extras"
            class="bd-highlight mb-1 shadow p-3 bg-body rounded checkbox-success"
            :key="extra.id"
          >
            <label
              class="form-check-label ps-3 bd-highlight pe-1 d-flex justify-content-between cursor-pointer"
              :for="`radio-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                type="radio"
                :id="`radio-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
                :value="extra.id"
                :name="`radio-${productGroupOfExtra['product_group_of_extra_id']}`"
                
              />
              <span class="px-2">{{ extra.name }}</span>
              <div class="ms-auto px-2 bd-highlight">
                {{ extra.price_adjustment }}&nbsp;€
              </div>
            </label>
          </div> -->
        </div>
      </div>
    </template>
  </section>
  <pre>{{ formData }}</pre>
</template>

<style scoped>
/* Add your styles here */
</style>
