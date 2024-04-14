<script setup>
import { ref, reactive, computed, toRefs } from "vue";
console.log("CheckboxRadioProductGroup.vue works");
const props = defineProps([
  "productGroupOfExtras",
  "selectedChildGroupOfExtraIds",
  "testIfDefaultExist",
  "displayElement",
]);

const { productGroupOfExtras, selectedChildGroupOfExtraIds } = toRefs(props);
console.log("productGroupOfExtras=", productGroupOfExtras);

const hasAtLeastOneCommonValueinArrays = (array1, array2, has_parent) => {
  // console.log("it works");
  // console.log("array1=", array1);
  // console.log("array2=", array2);
  if (!has_parent) {
    // console.log("!has_parent");
    return true;
  }
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
      <div
        v-show="
          hasAtLeastOneCommonValueinArrays(
            productGroupOfExtra.visible_with_extras,
            selectedChildGroupOfExtraIds,
            productGroupOfExtra.has_parent
          )
        "
        class="w-auto p-4 radio-group-of-extras"
      >
        <!-- <div  class="w-auto p-4 radio-group-of-extras " > -->
        <h2>{{ productGroupOfExtra.name }}</h2>
        <div class="form-check">
          <div
            v-for="extra in productGroupOfExtra.extras"
            class="d-flex bd-highlight mb-1 shadow p-3 bg-body rounded checkbox-success cursor-pointer"
            :key="extra.id"
            @click.stop.prevent="displayElement"
          >
            <label
              class="form-check-label px-3 bd-highlight pe-none"
              :for="`select-${extra.id}`"
            >
              <input
                class="form-check-input px-2 bd-highlight pe-none"
                :type="productGroupOfExtra.type == 0 ? 'radio' : 'checkbox'"
                :checked="
                  testIfDefaultExist(
                    productGroupOfExtra['default_value'],
                    extra.id,
                    productGroupOfExtra.type,
                    productGroupOfExtra.id
                  )
                    ? true
                    : false
                "
                :name="productGroupOfExtra.id"
                :id="`select-${extra.id}`"
                :value="extra.id"
              />
              {{ extra.name }}
            </label>
            <div class="ms-auto px-2 bd-highlight">{{ extra.price_adjustment }} €</div>
          </div>
        </div>
      </div>
    </template>
  </section>
</template>

<style scoped></style>
