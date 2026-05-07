<template>
  <div class="editor-container">
    <h1>🚀 Éditeur de Sondage</h1>
    
    <div class="card title-card">
      <input v-model="title" type="text" placeholder="Titre du sondage..." class="survey-title-input" />
    </div>

    <!-- On utilise notre nouveau composant QuestionEditor -->
    <QuestionEditor 
      v-for="(q, index) in questions" 
      :key="index" 
      :question="q"
      @remove="removeQuestion(index)"
    />

    <div class="footer-actions">
      <button @click="addQuestion" class="btn-add-q">+ Ajouter une question</button>
      <button @click="saveSurvey" class="btn-save" :disabled="!title">Publier</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import QuestionEditor from '../components/QuestionEditor.vue';

const router = useRouter();
const title = ref('');
const questions = ref([]);

const addQuestion = () => {
  questions.value.push({
    type: 'radio',
    label: '',
    options: ['Option 1'], // Initialisé avec une option vide au lieu de texte brut
    settings: { min: 0, max: 10 }
  });
};

const removeQuestion = (index) => {
  questions.value.splice(index, 1);
};

const saveSurvey = async () => {
  const token = localStorage.getItem('token');
  await axios.post('http://localhost:5000/api/surveys', {
    title: title.value,
    questions: questions.value
  }, {
    headers: { Authorization: `Bearer ${token}` }
  });
  router.push('/dashboard');
};
</script>

<style scoped>
.editor-container { max-width: 800px; margin: 40px auto; padding-bottom: 100px; }
.survey-title-input { width: 100%; border: none; font-size: 1.8rem; font-weight: bold; outline: none; }
.title-card { padding: 20px; background: white; border-radius: 12px; margin-bottom: 30px; }
.footer-actions { position: fixed; bottom: 0; left: 0; width: 100%; background: white; padding: 20px; display: flex; justify-content: center; gap: 20px; border-top: 1px solid #eee; }
.btn-add-q { padding: 12px 24px; border-radius: 8px; border: 2px solid #6c5ce7; color: #6c5ce7; background: white; cursor: pointer; font-weight: bold; }
.btn-save { padding: 12px 24px; border-radius: 8px; border: none; background: #6c5ce7; color: white; cursor: pointer; font-weight: bold; }
</style>