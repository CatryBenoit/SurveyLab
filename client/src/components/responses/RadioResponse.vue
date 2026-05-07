<template>
  <div class="radio-group">
    <label v-for="opt in question.options" :key="opt" class="radio-item">
      <input 
        type="radio" 
        :name="question._id" 
        :value="opt" 
        :checked="modelValue === opt"
        @change="$emit('update:modelValue', opt)"
      />
      {{ opt }}
    </label>
  </div>
</template>

<script setup>
defineProps(['question', 'modelValue']);
defineEmits(['update:modelValue']);
</script>