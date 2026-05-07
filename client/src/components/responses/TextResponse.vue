<template>
  <div class="text-response">
    <input 
      type="text" 
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder="Tapez votre réponse ici..."
      class="input-standard"
    />
  </div>
</template>

<script setup>
defineProps(['question', 'modelValue']);
defineEmits(['update:modelValue']);
</script>

<style scoped>
.input-standard {
  width: 100%;
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
}
</style>