<template>
  <div class="dashboard">
    <div class="header">
      <h1>Mes Sondages</h1>
      <button @click="$router.push('/create')" class="btn-primary">+ Nouveau Sondage</button>
    </div>

    <div v-if="loading" class="loader">Chargement...</div>

    <div v-else-if="surveys.length === 0" class="empty-state">
      <p>Vous n'avez pas encore créé de sondage.</p>
    </div>

    <div v-else class="survey-grid">
      <div v-for="survey in surveys" :key="survey._id" class="survey-card">
        <h3>{{ survey.title }}</h3>
        <p>{{ survey.questions.length }} questions</p>
        <div class="card-actions">
          <button @click="viewAnalytics(survey._id)">📊 Stats</button>
          <button @click="copyLink(survey._id)">🔗 Copier le lien</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const surveys = ref([]);
const loading = ref(true);

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await axios.get('http://localhost:5000/api/surveys/my-surveys', {
      headers: { Authorization: `Bearer ${token}` }
    });
    surveys.value = res.data;
  } catch (err) {
    console.error("Erreur dashboard:", err);
  } finally {
    loading.value = false;
  }
});

const copyLink = (id: string) => {
  const url = `${window.location.origin}/survey/${id}`;
  navigator.clipboard.writeText(url);
  alert("Lien copié !");
};

const viewAnalytics = (id: string) => {
};
</script>

<style scoped>
.survey-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}
.survey-card {
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #eee;
}
.card-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}
.btn-primary {
  background: #6c5ce7;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
}
</style>