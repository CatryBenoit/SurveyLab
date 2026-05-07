<template>
  <div class="slider-box">
    <div class="labels">
      <span>{{ question.settings?.min || 0 }}</span>
      <span>{{ question.settings?.max || 10 }}</span>
    </div>
    <input 
      type="range" 
      :min="question.settings?.min || 0" 
      :max="question.settings?.max || 10" 
      :value="modelValue"
      @input="$emit('update:modelValue', Number($event.target.value))"
    />
    <div class="current-val">Valeur : {{ modelValue }}</div>
  </div>
</template>

<script setup>
defineProps(['question', 'modelValue']);
defineEmits(['update:modelValue']);
</script>
