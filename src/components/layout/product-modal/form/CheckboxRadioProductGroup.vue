<script setup>
import { computed, watch, ref } from "vue";
import price from "../../../../hooks/price/priceHook.js";

// Define the props
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
  productId: {
    type: Number,
    required: true,
  },
});

// Importing helper functions
const { numberPriceToText } = price();

// Computed property for `checkboxRadioDataInputs` (using directly from props)
const checkboxRadioDataInputs = computed(() => props.checkboxRadioDataInputs);

// Watch for changes to `checkboxRadioDataInputs`
watch(
  checkboxRadioDataInputs,
  (newVal) => {
    console.log("Updated checkboxRadioDataInputs in grandchild:", newVal);
  },
  { deep: true }
);

// Computed array with all selected extras
const extrasArray = computed(() => {
  const result = extractValuesToArray(props.checkboxRadioDataInputs);
  console.log("Computed extrasArray:", result);
  return result;
});

// Function to extract values from `checkboxRadioDataInputs`
function extractValuesToArray(obj) {
  let finalArray = [];

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (Array.isArray(obj[key])) {
        finalArray = finalArray.concat(obj[key]);
      } else {
        finalArray.push(obj[key]);
      }
    }
  }

  return finalArray;
}

// Function to check if the group of extras is visible
const checkIfGroupIsVisible = (productGroupOfExtra) => {
  console.log("productGroupOfExtra ID:", productGroupOfExtra.product_group_of_extra_id);

  // Check if the group of extras has a default property
  if (props.checkboxRadioDataInputs.hasOwnProperty(productGroupOfExtra.product_group_of_extra_id)) {
    return true;
  }

  // Check if the group has no parent
  if (productGroupOfExtra.has_parent === 0) {
    return true;
  }

  // Check if it has `visible_with_extras`
  if (productGroupOfExtra.visible_with_extras.length === 0 || extrasArray.value.length === 0) {
    return false;
  }

  // Loop through `visible_with_extras` and check for inclusion
  for (let i = 0; i < productGroupOfExtra.visible_with_extras.length; i++) {
    const currentValue = productGroupOfExtra.visible_with_extras[i];
    console.log(
      `extrasArray: [${extrasArray.value.join(", ")}] - Checking value: ${currentValue} - Exists: `,
      extrasArray.value.includes(Number(currentValue))
    );
    if (extrasArray.value.includes(Number(currentValue))) {
      return true;
    }
  }
  return false;
};

// Function to check if an extra is checked
function checkIfExtraIsChecked(extraId) {
  return extrasArray.value.includes(extraId);
}

// Watch `productGroupOfExtras` for changes
watch(
  () => props.productGroupOfExtras,
  (newData) => {
    console.log("Updated productGroupOfExtras:", newData);
    props.initializecheckboxRadioDataInputsWithDefaultValues(props.productId);
  },
  { immediate: true }
);

</script>

<template>
  <section v-if="props.productGroupOfExtras.length > 0" class="w-auto p-2 group-of-extras">
    <template
      v-for="productGroupOfExtra in props.productGroupOfExtras"
      :key="productGroupOfExtra.product_group_of_extra_id"
    >
      <div v-if="checkIfGroupIsVisible(productGroupOfExtra)" class="w-auto p-2 radio-group-of-extras">
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div class="form-check p-0">
          <div
            v-for="extra in productGroupOfExtra.extras"
            class="bd-highlight mb-1 shadow px-3 bg-body rounded checkbox-success"
            :key="extra.id"
          >
            <label
              class="form-check-label ps-3 bd-highlight pe-1 py-3 d-flex justify-content-start cursor-pointer"
              :for="`item-${productGroupOfExtra.product_group_of_extra_id}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                :type="productGroupOfExtra.type === 1 ? 'checkbox' : 'radio'"
                :id="`item-${productGroupOfExtra.product_group_of_extra_id}-${extra.id}`"
                :value="extra.id"
                :name="`item-${productGroupOfExtra.product_group_of_extra_id}`"
                @change="(event) => props.handleCheckboxChange(event, productGroupOfExtra.product_group_of_extra_id)"
                :checked="checkIfExtraIsChecked(extra.id)"
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
</template>


<style scoped>
/* Add your styles here */
</style>
