<template>
  <div class="options-manager">
    <label>Options de réponse :</label>
    <div v-for="(opt, idx) in modelValue" :key="idx" class="option-row">
      <input 
        :value="opt" 
        @input="updateOption(idx, $event.target.value)"
        type="text" 
        placeholder="Nom de l'option"
      />
      <button @click="removeOption(idx)" class="btn-remove">✕</button>
    </div>
    <button @click="addOption" class="btn-add-opt">+ Ajouter une option</button>
  </div>
</template>

<script setup>
const props = defineProps(['modelValue']);
const emit = defineEmits(['update:modelValue']);

const addOption = () => {
  const newOptions = [...props.modelValue, ''];
  emit('update:modelValue', newOptions);
};

const removeOption = (index) => {
  const newOptions = props.modelValue.filter((_, i) => i !== index);
  emit('update:modelValue', newOptions);
};

const updateOption = (index, value) => {
  const newOptions = [...props.modelValue];
  newOptions[index] = value;
  emit('update:modelValue', newOptions);
};
</script>

<style scoped>
.option-row { display: flex; gap: 10px; margin-bottom: 8px; }
input { flex: 1; padding: 8px; border: 1px solid #ddd; border-radius: 6px; }
.btn-remove { background: #ff7675; color: white; border: none; border-radius: 6px; cursor: pointer; padding: 0 10px; }
.btn-add-opt { background: #f1f2f6; border: 1px dashed #6c5ce7; color: #6c5ce7; padding: 8px; width: 100%; border-radius: 6px; cursor: pointer; margin-top: 5px; font-weight: bold; }
</style>