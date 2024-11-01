

<script setup >
import { ref, watchEffect,  toRefs, watch, reactive, computed  } from "vue";
import price from "../../../../hooks/price/priceHook.js";
import CheckboxRadioProductGroup from "./CheckboxRadioProductGroup.vue";

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
  useLocalStorageData: {
    type: Boolean,
    required: true,
  }
});

// get all the props
const { productGroupOfExtras, handleCheckboxChange, useLocalStorageData } = toRefs(props);

// Create a local reactive copy of checkboxRadioDataInputs for modifications
const checkboxRadioDataInputs = reactive({...props.checkboxRadioDataInputs} );

const initializecheckboxRadioDataInputsWithDefaultValues = props.initializecheckboxRadioDataInputsWithDefaultValues;

console.log("product form checkboxRadioDataInputs:", checkboxRadioDataInputs);

</script>

<style scoped>

</style>

<template>
             <form @submit.prevent="handleSubmit">
              <!-- productGroup bootstap 5 radios with options -->
              <CheckboxRadioProductGroup  :productGroupOfExtras="productGroupOfExtras"
                :initializecheckboxRadioDataInputsWithDefaultValues="initializecheckboxRadioDataInputsWithDefaultValues"
                :handleCheckboxChange="handleCheckboxChange" :checkboxRadioDataInputs="checkboxRadioDataInputs">
              </CheckboxRadioProductGroup>
              <div class="mb-3 w-auto p-3 " style="background-color: rgb(244, 244, 244);">
                <label for="extraDetails" class="form-label "><span class="fw-bold">Θέλεις να λάβουμε κάτι υπόψη;</span>(προαιρετικό)</label>
                <textarea v-model="extraDetails" class="form-control " id="extraDetails" rows="3" placeholder="Πρόσθεσε το σχόλιό σου εδώ"></textarea>
              </div>
            </form>
</template>