<template>
  <div id="app">
    <nav class="navbar">
      <div class="logo" @click="$router.push('/')">📊 SurveyLab</div>
      <div class="nav-links">
        <router-link to="/">Accueil</router-link>
        
        <template v-if="isLoggedIn">
          <router-link to="/dashboard">Mes Sondages</router-link>
          <router-link to="/create" class="btn-create">+ Créer</router-link>
          <button @click="logout" class="btn-logout">Déconnexion</button>
        </template>
 
        <template v-else>
          <router-link to="/login">Connexion</router-link>
          <router-link to="/register" class="btn-auth">S'inscrire</router-link>
        </template>
      </div>
    </nav>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer">
      <p>&copy; 2024 SurveyLab - Projet Perso</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const isLoggedIn = ref(false);

const checkAuth = () => {
  isLoggedIn.value = !!localStorage.getItem('token');
};

onMounted(() => {
  checkAuth();
});

watch(() => route.path, () => {
  checkAuth();
});

const logout = () => {
  localStorage.removeItem('token');
  isLoggedIn.value = false;
  router.push('/login');
};
</script>

<style>
body {
  margin: 0;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  background-color: #f8f9fa;
  color: #2d3436;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 5%;
  background: white;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #6c5ce7;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 20px;
  align-items: center;
}

.nav-links a {
  text-decoration: none;
  color: #636e72;
  font-weight: 500;
  transition: color 0.3s;
}

.nav-links a:hover {
  color: #6c5ce7;
}

.container {
  min-height: 80vh;
  padding: 2rem 5%;
}

.btn-create {
  background: #6c5ce7;
  color: white !important;
  padding: 8px 16px;
  border-radius: 8px;
}

.btn-auth {
  border: 2px solid #6c5ce7;
  padding: 8px 16px;
  border-radius: 8px;
  color: #6c5ce7 !important;
}

.btn-logout {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-weight: 500;
  font-size: 1rem;
}

.footer {
  text-align: center;
  padding: 2rem;
  color: #b2bec3;
  font-size: 0.9rem;
}
</style>