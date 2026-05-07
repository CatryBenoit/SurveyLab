<template>
  <div class="tier-response">
    <div v-for="item in question.options" :key="item" class="tier-row">
      <span class="item-name">{{ item }}</span>
      <div class="ranks">
        <button 
          v-for="rank in ['S', 'A', 'B', 'C', 'D']" 
          :key="rank"
          @click="updateTier(item, rank)"
          :class="['rank-btn', rank.toLowerCase(), { active: modelValue[item] === rank }]"
        >
          {{ rank }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['question', 'modelValue']);
const emit = defineEmits(['update:modelValue']);

const updateTier = (item, rank) => {
  const newValue = { ...props.modelValue };
  newValue[item] = rank;
  emit('update:modelValue', newValue);
};
</script>

<style scoped>
.tier-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #eee; }
.rank-btn { padding: 5px 10px; border: 1px solid #ddd; background: white; border-radius: 4px; cursor: pointer; margin-left: 4px; }
.rank-btn.s.active { background: #ff7675; color: white; }
</style>