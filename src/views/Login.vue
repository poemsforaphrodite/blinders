<template>
    <div class="login-container">
      <h1>Login</h1>
      <form @submit.prevent="handleLogin">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
  
        <button @click="signInWithEmail">Log In</button>
        <button @click="signInWithGoogle">Sign In with Google</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {getAuth, signInWithEmailAndPassword} from 'firebase/auth';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();

  const signInWithEmail = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("logged in with email and password");
      router.push('/feed');
    })
    .catch((error) => {
      console.log("wrong email or password");
      alert(error.message);
    });
    router.push('/signup');
  };

  const signInWithGoogle = () => {
    // Perform Google sign in logic here (e.g., API call, validation)
  
    // For demonstration purposes, let's navigate to a home page after successful signup
    router.push('/');
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    background-color: #fff;
    margin-top: 50px; /* Adjust the margin-top based on your design preference */
  }
  
  h1 {
    text-align: center;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin-bottom: 8px;
  }
  
  input {
    padding: 8px;
    margin-bottom: 16px;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button {
    padding: 10px;
    background-color: #42b983;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }
  
  button:hover {
    background-color: #358862;
  }
  </style>
  