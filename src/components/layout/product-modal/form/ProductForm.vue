

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
  },
  productId: {
    type: Number,
    required: true,
  },
});

// create afunction that check if  props.productGroupOfExtras has the property "product_group_of_extra" and if it has it that the value is not 0 the array or null
const checkIfProductGroupOfExtrasExist = computed(() => {
  if (props.productGroupOfExtras && props.productGroupOfExtras.length > 0) {
    return true;
  }
  return false;
});

const computedCheckboxRadioDataInputs = computed(() => props.checkboxRadioDataInputs);

watch(
  computedCheckboxRadioDataInputs,
  (newVal) => {
    console.log("Updated props.checkboxRadioDataInputs in First Child:", newVal);
  },
  { deep: true }
);
// alert("props.checkboxRadioDataInputs:" + JSON.stringify(props.checkboxRadioDataInputs));

</script>

<style scoped>

</style>

<template>
             <form @submit.prevent="handleSubmit">
              <!-- productGroup bootstap 5 radios with options -->
              <CheckboxRadioProductGroup v-if="checkIfProductGroupOfExtrasExist" :productId="props.productId" :productGroupOfExtras="props.productGroupOfExtras"
                :initializecheckboxRadioDataInputsWithDefaultValues="props.initializecheckboxRadioDataInputsWithDefaultValues"
                :handleCheckboxChange="props.handleCheckboxChange" :checkboxRadioDataInputs="props.checkboxRadioDataInputs">
              </CheckboxRadioProductGroup>
              <div class="mb-3 w-auto p-3 " style="background-color: rgb(244, 244, 244);">
                <label for="extraDetails" class="form-label "><span class="fw-bold">Θέλεις να λάβουμε κάτι υπόψη;</span>(προαιρετικό)</label>
                <textarea v-model="extraDetails" class="form-control " id="extraDetails" rows="3" placeholder="Πρόσθεσε το σχόλιό σου εδώ"></textarea>
              </div>
            </form>
</template>