<template>
  <div class="analytics-container" v-if="data">
    <header class="stats-header">
      <h1>Analyses : {{ data.survey.title }}</h1>
      <div class="stat-badge">Total : {{ data.total }} réponses</div>
    </header>

    <div class="filter-section card">
      <h3>🔍 Filtrer les résultats</h3>
      <div class="filter-controls">
        <select v-model="filter.questionId">
          <option value="">Choisir une question pour filtrer...</option>
          <option v-for="q in data.survey.questions" :key="q._id" :value="q._id">
            {{ q.label }}
          </option>
        </select>

        <input v-model="filter.value" placeholder="Valeur (ex: S, ou Oui)" />
        
        <button @click="fetchAnalytics" class="btn-filter">Appliquer le filtre</button>
        <button @click="resetFilter" class="btn-reset">Réinitialiser</button>
      </div>
    </div>

    <!-- AFFICHAGE DES RÉSULTATS -->
    <div class="results-grid">
      <div v-for="q in data.survey.questions" :key="q._id" class="card result-card">
        <h4>{{ q.label }}</h4>
        
        <div class="chart-placeholder">
          <ul>
            <li v-for="(count, val) in calculateStats(q._id)" :key="val">
              <strong>{{ val }} :</strong> {{ count }} ({{ Math.round((count/data.total)*100) }}%)
              <div class="progress-mini"><div :style="{width: (count/data.total)*100 + '%'}"></div></div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const route = useRoute();
const data = ref<any>(null);
const filter = reactive({ questionId: '', value: '' });

const fetchAnalytics = async () => {
  const token = localStorage.getItem('token');
  const url = `http://localhost:5000/api/surveys/${route.params.id}/analytics`;
  const res = await axios.get(url, {
    params: { filterQ: filter.questionId, filterV: filter.value },
    headers: { Authorization: `Bearer ${token}` }
  });
  data.value = res.data;
};

const resetFilter = () => {
  filter.questionId = '';
  filter.value = '';
  fetchAnalytics();
};

const calculateStats = (qId: string) => {
  const stats: any = {};
  data.value.responses.forEach((resp: any) => {
    const answer = resp.answers.find((a: any) => a.questionId === qId);
    if (answer) {
      const val = typeof answer.value === 'object' ? JSON.stringify(answer.value) : answer.value;
      stats[val] = (stats[val] || 0) + 1;
    }
  });
  return stats;
};

onMounted(fetchAnalytics);
</script>

<style scoped>
.analytics-container { max-width: 1000px; margin: auto; padding: 20px; }
.card { background: white; padding: 20px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); margin-bottom: 20px; }
.stats-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
.stat-badge { background: #6c5ce7; color: white; padding: 10px 20px; border-radius: 50px; font-weight: bold; }

.filter-controls { display: flex; gap: 10px; margin-top: 15px; }
.filter-controls select, .filter-controls input { padding: 10px; border: 1px solid #ddd; border-radius: 8px; flex: 1; }

.results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
.result-card h4 { margin-top: 0; color: #6c5ce7; }

.progress-mini { height: 8px; background: #eee; border-radius: 4px; margin-top: 5px; overflow: hidden; }
.progress-mini div { height: 100%; background: #6c5ce7; }

.btn-filter { background: #6c5ce7; color: white; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
.btn-reset { background: #f1f2f6; border: none; padding: 10px 20px; border-radius: 8px; cursor: pointer; }
</style>