<template>
  <div class="question-card">
    <div class="q-header">
      <span class="q-number">Question</span>
      <button @click="$emit('remove')" class="btn-delete-q">Supprimer</button>
    </div>

    <div class="q-main">
      <input v-model="question.label" class="label-input" placeholder="Intitulé de la question..." />
      
      <select v-model="question.type" class="type-select">
        <option value="text">Texte court</option>
        <option value="radio">Choix unique</option>
        <option value="checkbox">Choix multiples</option>
        <option value="tier_list">Tier List</option>
        <option value="slider">Curseur (Slider)</option>
        <option value="rating">Note / Étoiles</option>
      </select>
    </div>

    <div class="q-settings">
      <!-- On affiche l'éditeur d'options seulement si nécessaire -->
      <OptionEditor 
        v-if="['radio', 'checkbox', 'tier_list'].includes(question.type)"
        v-model="question.options"
      />

      <!-- Réglages pour Slider -->
      <div v-if="question.type === 'slider'" class="slider-settings">
        <input type="number" v-model="question.settings.min" placeholder="Min" />
        <input type="number" v-model="question.settings.max" placeholder="Max" />
      </div>
    </div>
  </div>
</template>

<script setup>
import OptionEditor from './OptionEditor.vue';
const props = defineProps(['question']);
</script>

<style scoped>
.question-card { background: white; padding: 20px; border-radius: 12px; border-left: 6px solid #6c5ce7; margin-bottom: 20px; box-shadow: 0 4px 10px rgba(0,0,0,0.05); }
.q-header { display: flex; justify-content: space-between; margin-bottom: 15px; }
.q-main { display: flex; gap: 10px; margin-bottom: 15px; }
.label-input { flex: 2; padding: 10px; border: 1px solid #eee; border-radius: 8px; font-size: 1rem; }
.type-select { flex: 1; padding: 10px; border-radius: 8px; border: 1px solid #eee; background: #f9f9f9; }
.btn-delete-q { color: #ff7675; background: none; border: none; cursor: pointer; }
</style>