<template>
  <div class="editor-container">
    <div class="editor-header">
      <h1>🚀 Créer votre Sondage</h1>
      <p>Personnalisez vos questions et récoltez des données précieuses.</p>
    </div>

    <!-- Titre du Sondage -->
    <div class="card title-card">
      <label>Titre de la plateforme</label>
      <input 
        v-model="title" 
        type="text" 
        placeholder="Ex: Enquête de satisfaction 2026" 
        class="survey-title-input" 
      />
    </div>

    <!-- Liste Dynamique des Questions -->
    <div class="questions-list">
      <QuestionEditor 
        v-for="(q, index) in questions" 
        :key="index" 
        :question="q"
        :index="index"
        @remove="removeQuestion(index)"
      />
    </div>

    <!-- État vide si aucune question -->
    <div v-if="questions.length === 0" class="empty-state">
      <p>Cliquez sur le bouton ci-dessous pour ajouter votre première question.</p>
    </div>

    <!-- Actions Fixes en bas -->
    <div class="footer-actions">
      <button @click="addQuestion" class="btn-add-q">
        <span class="icon">+</span> Ajouter une question
      </button>
      <button 
        @click="saveSurvey" 
        class="btn-save" 
        :disabled="!title || questions.length === 0"
      >
        Publier le Sondage
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
// Import du composant enfant
import QuestionEditor from '../components/QuestionEditor.vue';

const router = useRouter();
const title = ref('');
const questions = ref([]);

// Logique pour ajouter une question avec une structure par défaut propre
const addQuestion = () => {
  questions.value.push({
    type: 'radio',
    label: '',
    options: ['Option 1'], // On commence avec une option par défaut
    settings: {
      min: 0,
      max: 10,
      step: 1
    }
  });
};

const removeQuestion = (index) => {
  questions.value.splice(index, 1);
};

const saveSurvey = async () => {
  try {
    const token = localStorage.getItem('token');
    const payload = {
      title: title.value,
      questions: questions.value
    };

    await axios.post('http://localhost:5000/api/surveys', payload, {
      headers: { Authorization: `Bearer ${token}` }
    });
    
    alert("Sondage publié avec succès !");
    router.push('/dashboard');
  } catch (err) {
    console.error("Erreur lors de la sauvegarde :", err);
    alert("Impossible de sauvegarder le sondage. Vérifiez votre connexion.");
  }
};
</script>

<style scoped>
.editor-container {
  max-width: 800px;
  margin: 40px auto;
  padding: 0 20px 120px 20px; /* Padding bottom pour ne pas être caché par le footer */
}

.editor-header {
  text-align: center;
  margin-bottom: 40px;
}

.title-card {
  background: white;
  padding: 30px;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  margin-bottom: 30px;
  border-top: 6px solid #6c5ce7;
}

.survey-title-input {
  width: 100%;
  border: none;
  font-size: 1.8rem;
  font-weight: 800;
  outline: none;
  color: #2d3436;
}

.empty-state {
  text-align: center;
  padding: 40px;
  background: #f1f2f6;
  border-radius: 12px;
  border: 2px dashed #ccc;
  color: #636e72;
}

.footer-actions {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: white;
  padding: 20px 5%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 -5px 15px rgba(0,0,0,0.05);
  z-index: 100;
}

.btn-add-q {
  padding: 12px 24px;
  border-radius: 12px;
  border: 2px solid #6c5ce7;
  color: #6c5ce7;
  background: white;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.3s;
}

.btn-add-q:hover {
  background: #f0edff;
}

.btn-save {
  padding: 14px 30px;
  border-radius: 12px;
  border: none;
  background: #6c5ce7;
  color: white;
  cursor: pointer;
  font-weight: bold;
  font-size: 1rem;
  transition: opacity 0.3s;
}

.btn-save:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>