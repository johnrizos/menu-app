<script setup>
import { ref, reactive, computed, toRefs, watch } from "vue";
console.log("CheckboxRadioProductGroup.vue works");
const props = defineProps([
  "productGroupOfExtras",
  "selectedChildGroupOfExtraIds",
  "testIfDefaultExist",
  "displayElement",
]);

const { productGroupOfExtras } = toRefs(props);
console.log("productGroupOfExtras=", productGroupOfExtras);

const formData = ref({});
const checkboxValues = ref({});
const radioValues = ref({});

const initializeValues = () => {
  // Initialize checkbox and radio values based on data prop
  const data = productGroupOfExtras.value;
  for (const categoryId in data) {
    console.log("initializeValues categoryId=", categoryId);
    if (data[categoryId].type === 1) {
      checkboxValues.value[categoryId] = {};
      for (const itemId in data[categoryId].data) {
        checkboxValues.value[categoryId][itemId] =
          data[categoryId].default?.includes(parseInt(itemId)) || false;
      }
    } else if (data[categoryId].type === 0) {
      radioValues.value[categoryId] = data[categoryId].default || null;
    }
  }

  updateFormData();
};

const updateFormData = () => {
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

  formData.value = { ...checkboxData, ...radioData };
};

watch(props, initializeValues, { immediate: true, deep: true });
watch([checkboxValues, radioValues], updateFormData, { deep: true });

const hasAtLeastOneCommonValueinArrays = (array1, array2, has_parent) => {
  // console.log("it works");
  // console.log("array1=", array1);
  // console.log("array2=", array2);
  if (!has_parent) {
    // console.log("!has_parent");
    return true;
  }
  // I return false belwo for debugging purposes
  return false;
  if (!array1 || !array2) {
    // console.log("no array1 or array2");
    return false;
  }
  for (let i = 0; i < array1.length; i++) {
    const num1 = parseFloat(array1[i]); // Convert to number
    if (!isNaN(num1)) {
      for (let j = 0; j < array2.length; j++) {
        const num2 = parseFloat(array2[j]); // Convert to number
        if (!isNaN(num2) && num1 === num2) {
          return true;
        }
      }
    }
  }
  // console.log("no common values");
  return false;
};
</script>

<template>
  <section v-if="productGroupOfExtras" class="w-auto p-3 group-of-extras">
    section work

    <template
      v-for="productGroupOfExtra in productGroupOfExtras"
      :key="productGroupOfExtra.id"
    >
      <!-- check if the product_group has  -->
      <div
        v-if="!productGroupOfExtra.has_parent || productGroupOfExtra.default_value"
        class="w-auto p-4 radio-group-of-extras"
      >
        <!-- <div  class="w-auto p-4 radio-group-of-extras " > -->
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div class="form-check">
          <!-- check box -->

          <section
            v-if="productGroupOfExtra.type == 1"
            v-for="extra in productGroupOfExtra.extras"
            class="d-flex bd-highlight mb-1 shadow p-3 bg-body rounded checkbox-success cursor-pointer"
            :key="extra.id"
            @click.stop.prevent="displayElement"
          >
            <label
              class="form-check-label px-3 bd-highlight pe-none"
              :for="`checkbox-${productGroupOfExtra.id}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                type="checkbox"
                :id="`checkbox-${productGroupOfExtra.id}-${extra.id}`"
                :value="extra.id"
                v-model="checkboxValues[productGroupOfExtra.id][extra.id]"
              />
              {{ extra.name }}
            </label>

            <div class="ms-auto px-2 bd-highlight">{{ extra.price_adjustment }} €</div>
          </section>
          <!-- radio box -->
          <section
            v-if="productGroupOfExtra.type == 0"
            v-for="extra in productGroupOfExtra.extras"
            class="d-flex bd-highlight mb-1 shadow p-3 bg-body rounded checkbox-success cursor-pointer"
            :key="extra.id"
            @click.stop.prevent="displayElement"
          >
            <label
              class="form-check-label px-3 bd-highlight pe-none"
              :for="`radio-${productGroupOfExtra.id}-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                type="radio"
                :id="`radio-${productGroupOfExtra.id}-${extra.id}`"
                :value="extra.id"
                v-model="radioValues[productGroupOfExtra.id]"
              />
              {{ extra.name }}
            </label>

            <div class="ms-auto px-2 bd-highlight">{{ extra.price_adjustment }} €</div>
          </section>
        </div>
      </div>
    </template>
  </section>
  <pre>{{ formData }}</pre>
</template>

<style scoped></style>
