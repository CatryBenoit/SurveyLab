<template>
  <div class="tier-list-container">
    <h3>{{ question.label }}</h3>
    <div v-for="item in question.options" :key="item" class="item-row">
      <span>{{ item }}</span>
      <select v-model="responses[item]">
        <option value="S">S (Elite)</option>
        <option value="A">A (Génial)</option>
        <option value="B">B (Moyen)</option>
        <option value="C">C (Bof)</option>
        <option value="D">D (Nul)</option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue';

const props = defineProps(['question']);
const emit = defineEmits(['update']);

const responses = reactive({});

props.question.options.forEach(opt => responses[opt] = 'B');

watch(responses, (newVal) => {
  emit('update', newVal);
});
</script>

<style scoped>
.item-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 10px; background: #f4f4f4; border-radius: 8px; }
</style>