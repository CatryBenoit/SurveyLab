<template>
  <div class="auth-container">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label>Mot de passe</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Se connecter</button>
      <p v-if="error" class="error">{{ error }}</p>
      <router-link to="/register">Pas encore de compte ? S'inscrire</router-link>
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
const router = useRouter();

const handleLogin = async () => {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: email.value,
      password: password.value
    });
    localStorage.setItem('token', res.data.token);
    router.push('/dashboard');
  } catch (err: any) {
    error.value = err.response?.data?.message || "Erreur de connexion";
  }
};
</script>const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', UserSchema);