<template>
  <div class="response-handler">
    <!-- On utilise dynamic components ou des v-if simples -->
    <component 
      :is="getComponent(question.type)" 
      :question="question" 
      v-model="internalValue"
    />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import RadioResponse from './RadioResponse.vue';
import SliderResponse from './SliderResponse.vue';
import TextResponse from './TextResponse.vue';
import TierListResponse from './TierListResponse.vue';

const props = defineProps(['question', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

// Synchronisation propre du v-model
const internalValue = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});

const getComponent = (type) => {
  const map = {
    'radio': RadioResponse,
    'slider': SliderResponse,
    'text': TextResponse,
    'tier_list': TierListResponse
  };
  return map[type] || TextResponse;
};
</script>