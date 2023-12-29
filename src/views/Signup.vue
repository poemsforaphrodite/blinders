<template>
    <div class="signup-container">
      <h1>Signup</h1>
      <form @submit.prevent="handleSignup">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required>
        <p v-if="errMessage">{{errMessage}}</p>
        <button @click="signUpWithEmail">Sign Up</button>
        <button @click="signUpWithGoogle">Sign Up with Google</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
  
  const email = ref('');
  const password = ref('');
  const router = useRouter();
  const errMessage = ref('');
//TODO: add password confirmation
//TODO: add password strength meter
//TODO: add email verification
  const signUpWithEmail = () => {
    createUserWithEmailAndPassword(getAuth(), email.value, password.value)
    .then((data) => {
      console.log("User created with email and password");
      router.push('/feed');

    })
    .catch((error) => {
      console.log("Error creating user with email and password");
        switch(error.code){
            case "auth/invalid-email":
            errMessage.value = "Invalid email address format";
            break;
            case "auth/weak-password":
            errMessage.value = "Password should be at least 6 characters";
            break;
            case "auth/email-already-in-use":
            errMessage.value = "Email already in use";
            break;
            default:
            errMessage.value = "An error occured";
        }
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
  .signup-container {
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
  