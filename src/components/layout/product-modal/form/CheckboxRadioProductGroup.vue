<script setup>
import { ref, watchEffect, defineProps, toRefs, watch } from "vue";

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

const { productGroupOfExtras } = toRefs(props);
console.log("productGroupOfExtras=", productGroupOfExtras);

const formData = ref({});
const checkboxValues = ref({});
const radioValues = ref({});

const initializeValues = () => {
  console.log("initializeValues");
  console.log("checkboxValues", checkboxValues.value);
  console.log("radioValues", radioValues.value);
  const data = productGroupOfExtras.value;
  for (const categoryId in data) {
    const category = data[categoryId];
    if (category.type === 1) {
      // Checkbox group
      checkboxValues.value[categoryId] = {};
      category.extras.forEach((extra) => {
        checkboxValues.value[categoryId][extra.id] =
          category.default_value?.includes(extra.id) || false;
      });
    } else if (category.type === 0 && Object.keys(radioValues.value).length > 0) {
      console.log("radioValues.value",radioValues.value);
      // Radio group
      // radioValues.value[categoryId] = category.default_value || null;
      console.log("radioValues.value 2",radioValues.value);

    }
  }
  updateFormData();
};

const updateFormData = () => {
  console.log("updateFormData");
  console.log("Array.isArray(checkboxValues.value",Array.isArray(checkboxValues.value));
  console.log("checkboxValues", checkboxValues.value);
  console.log("radioValues", radioValues.value);
  const checkboxData = Object.keys(checkboxValues.value).reduce((acc, categoryId) => {
    const selectedIds = Object.keys(checkboxValues.value[categoryId]).filter(
      (itemId) => checkboxValues.value[categoryId][itemId]
    );
    if (selectedIds.length > 0) {
      acc[categoryId] = selectedIds.map(Number);
    }
    return acc;
  }, {});

  const radioData = Object.keys(radioValues.value).reduce((acc, categoryId) => {
    if (radioValues.value[categoryId] !== null) {
      acc[categoryId] = [radioValues.value[categoryId]];
    }
    return acc;
  }, {});

  formData.value = JSON.stringify({ ...checkboxData, ...radioData });
  console.log("formData", formData.value);
};

watchEffect(() => {
  updateFormData();
});

watch(productGroupOfExtras, initializeValues, { immediate: true, deep: true });
watch(
  radioValues,
  (newVal) => {
    console.log("radioValues changed:", newVal);
  },
  { deep: true }
);

// const hasAtLeastOneCommonValueinArrays = (array1, array2, has_parent) => {
//   if (!has_parent) {
//     return true;
//   }
//   if (!array1 || !array2) {
//     return false;
//   }
//   for (let i = 0; i < array1.length; i++) {
//     const num1 = parseFloat(array1[i]); // Convert to number
//     if (!isNaN(num1)) {
//       for (let j = 0; j < array2.length; j++) {
//         const num2 = parseFloat(array2[j]); // Convert to number
//         if (!isNaN(num2) && num1 === num2) {
//           return true;
//         }
//       }
//     }
//   }
//   return false;
// };
</script>

<template>
  <section v-if="productGroupOfExtras" class="w-auto p-3 group-of-extras">
    <template
      v-for="productGroupOfExtra in productGroupOfExtras"
      :key="productGroupOfExtra['product_group_of_extra_id']"
    >
      <!--         v-if="!productGroupOfExtra.has_parent || productGroupOfExtra.default_value"
 -->
      <div class="w-auto p-4 radio-group-of-extras">
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div class="form-check">
          <!-- Checkbox -->
          <div
            v-if="productGroupOfExtra.type == 1"
            v-for="extra in productGroupOfExtra.extras"
            class="bd-highlight mb-1 shadow p-3 bg-body rounded checkbox-success"
            :key="extra.id"
          >
            <label
              class="form-check-label ps-3 bd-highlight pe-1 d-flex justify-content-between cursor-pointer"
              :for="`checkbox-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                type="checkbox"
                :id="`checkbox-${productGroupOfExtra['product_group_of_extra_id']}-${extra.id}`"
                :value="extra.id"
                :name="`checkbox-${productGroupOfExtra['product_group_of_extra_id']}`"
                v-model="checkboxValues[productGroupOfExtra['product_group_of_extra_id']][extra.id]"

              />
                <!-- v-model="checkboxValues[productGroupOfExtra['product_group_of_extra_id']][extra.id]" -->
              <span class="px-2">{{ extra.name }}</span>
              <div class="ms-auto px-2 bd-highlight">
                {{ extra.price_adjustment }}&nbsp;€
              </div>
            </label>
          </div>
          <!-- Radio -->
          <div
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
                v-model="radioValues[productGroupOfExtra['product_group_of_extra_id']]"
              />
              <span class="px-2">{{ extra.name }}</span>
              <div class="ms-auto px-2 bd-highlight">
                {{ extra.price_adjustment }}&nbsp;€
              </div>
            </label>
          </div>
        </div>
      </div>
    </template>
  </section>
  <pre>{{ formData }}</pre>
</template>

<style scoped>
/* Add your styles here */
</style>
