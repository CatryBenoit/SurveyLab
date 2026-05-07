<template>
  <div class="survey-page">
    <div v-if="loading" class="state-msg">⏳ Chargement du sondage...</div>
    <div v-else-if="error" class="state-msg error">{{ error }}</div>

    <div v-else-if="survey" class="survey-container">
      <header class="survey-header">
        <h1>{{ survey.title }}</h1>
        <div class="progress-container">
          <div class="progress-bar" :style="{ width: progress + '%' }"></div>
          <span class="progress-label">{{ Math.round(progress) }}% complété</span>
        </div>
      </header>

      <main class="questions-list">
        <div 
          v-for="(q, index) in survey.questions" 
          :key="q._id || index" 
          class="question-card"
        >
          <h3 class="question-title">
            <span class="q-index">{{ index + 1 }}</span> {{ q.label }}
          </h3>
          
          <ResponseHandler 
            :question="q" 
            v-model="answers[q._id || `q-${index}`]" 
          />
        </div>
      </main>

      <footer class="survey-footer">
        <button @click="submitSurvey" class="btn-submit" :disabled="submitting">
          {{ submitting ? 'Envoi en cours...' : 'Envoyer mes réponses' }}
        </button>
      </footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';
import ResponseHandler from '../components/responses/ResponseHandler.vue';

const route = useRoute();
const survey = ref<any>(null);
const answers = ref<any>({});
const loading = ref(true);
const error = ref('');
const submitting = ref(false);

onMounted(async () => {
  try {
    const res = await axios.get(`http://localhost:5000/api/surveys/${route.params.id}`);
    survey.value = res.data;
    
    const initialData: any = {};
    survey.value.questions.forEach((q: any, index: number) => {
      const key = q._id || `q-${index}`;
      
      if (q.type === 'tier_list') {
        initialData[key] = {};
      } else if (q.type === 'slider' || q.type === 'rating') {
        initialData[key] = q.settings?.min || 0;
      } else if (q.type === 'checkbox') {
        initialData[key] = [];
      } else {
        initialData[key] = '';
      }
    });
    
    answers.value = initialData;
  } catch (err: any) {
    error.value = "Impossible de charger le sondage. Vérifiez l'ID ou votre connexion.";
    console.error("Détails de l'erreur :", err);
  } finally {
    loading.value = false;
  }
});

const progress = computed(() => {
  if (!survey.value || survey.value.questions.length === 0) return 0;
  const total = survey.value.questions.length;
  const answered = Object.values(answers.value).filter(v => {
    if (Array.isArray(v)) return v.length > 0;
    if (typeof v === 'object' && v !== null) return Object.keys(v).length > 0;
    return v !== '' && v !== null && v !== undefined;
  }).length;
  return (answered / total) * 100;
});

const submitSurvey = async () => {
  submitting.value = true;
  try {
    const formattedAnswers = Object.entries(answers.value).map(([id, val]) => ({
      questionId: id,
      value: val
    }));

    await axios.post(`http://localhost:5000/api/surveys/${route.params.id}/responses`, {
      answers: formattedAnswers
    });
    
    alert("Merci ! Vos réponses ont été enregistrées avec succès. 🗳️");
  } catch (err) {
    console.error(err);
    alert("Une erreur est survenue lors de l'envoi de vos réponses.");
  } finally {
    submitting.value = false;
  }
};
</script>

<style scoped>
.survey-page {
  background: #f4f7f6;
  min-height: 100vh;
  padding: 40px 20px;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.survey-container {
  max-width: 700px;
  margin: auto;
}

.survey-header {
  margin-bottom: 40px;
  text-align: center;
}

.survey-header h1 {
  color: #2d3436;
  font-size: 2.2rem;
  margin-bottom: 20px;
}

.question-card {
  background: white;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.05);
  margin-bottom: 25px;
  border: 1px solid #edf2f7;
}

.question-title {
  margin-top: 0;
  margin-bottom: 25px;
  font-size: 1.25rem;
  color: #2d3436;
  display: flex;
  align-items: center;
  gap: 15px;
}

.q-index {
  background: #6c5ce7;
  color: white;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: 0.9rem;
  flex-shrink: 0;
}

.progress-container {
  background: #e2e8f0;
  height: 12px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  margin-bottom: 10px;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #6c5ce7, #a29bfe);
  transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
}

.progress-label {
  font-size: 0.85rem;
  color: #718096;
  font-weight: 600;
}

.survey-footer {
  margin-top: 40px;
}

.btn-submit {
  width: 100%;
  padding: 18px;
  background: #6c5ce7;
  color: white;
  border: none;
  border-radius: 15px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2);
}

.btn-submit:hover:not(:disabled) {
  background: #5b4cc4;
  transform: translateY(-2px);
  box-shadow: 0 15px 25px rgba(108, 92, 231, 0.3);
}

.btn-submit:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.state-msg {
  text-align: center;
  padding: 100px;
  font-size: 1.3rem;
  color: #4a5568;
}

.state-msg.error {
  color: #e53e3e;
}
</style>