<template>
  <div>
    <!-- Checkbox Groups -->
    <div v-for="(checkboxGroup, groupId) in checkboxGroups" :key="groupId">
      <h2>Group {{ groupId }}</h2>
      <div>
        <div v-for="option in checkboxGroup" :key="option">
          <label>
            <input type="checkbox" :value="option" v-model="checkboxSelections[groupId]" @change="handleCheckboxChange(groupId, option)">
            Checkbox {{ option }}
          </label>
        </div>
      </div>
    </div>

    <button @click="submitForm">Submit</button>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const checkboxGroups = {
      "1": [1, 2, 3, 4],
      "3": [4, 6, 7, 8]
    };

    const checkboxSelections = {};

    // Initialize checkbox selections
    for (const groupId in checkboxGroups) {
      checkboxSelections[groupId] = [];
    }

    const handleCheckboxChange = (groupId, value) => {
      const index = checkboxSelections[groupId].indexOf(value);
      if (index === -1) {
        // Add the value if it doesn't exist
        checkboxSelections[groupId].push(value);
      } else {
        // Remove the value if it exists
        checkboxSelections[groupId].splice(index, 1);
      }
    };

    const submitForm = () => {
      console.log('Checkbox Selections:', checkboxSelections);
    };

    return {
      checkboxGroups,
      checkboxSelections,
      handleCheckboxChange,
      submitForm
    };
  }
};
</script>
