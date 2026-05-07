<template>
  <div class="auth-container">
    <h2>Créer un compte</h2>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required placeholder="votre@email.com" />
      </div>
      <div class="form-group">
        <label>Mot de passe</label>
        <input v-model="password" type="password" required placeholder="••••••••" />
      </div>
      <button type="submit" :disabled="loading">S'inscrire</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);
const router = useRouter();

const handleRegister = async () => {
  loading.value = true;
  error.value = '';
  try {
    const res = await axios.post('http://localhost:5000/api/auth/register', {
      email: email.value,
      password: password.value
    });
    
    // On stocke le token pour rester connecté
    localStorage.setItem('token', res.data.token);
    
    // Direction le dashboard !
    router.push('/dashboard');
  } catch (err: any) {
    error.value = err.response?.data?.message || "Une erreur est survenue";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-container { max-width: 400px; margin: 50px auto; padding: 20px; background: white; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
input { padding: 10px; border: 1px solid #ddd; border-radius: 6px; }
button { background: #6c5ce7; color: white; border: none; padding: 12px; border-radius: 6px; cursor: pointer; width: 100%; font-weight: bold; }
button:disabled { background: #a29bfe; }
.error { color: #e74c3c; margin-top: 10px; font-size: 0.9rem; }
</style>