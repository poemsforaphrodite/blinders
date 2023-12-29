<template>
  <div id="app">
    <nav>
      <ul class="navigation">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/feed">Feed</router-link></li>
        <li><button @click="handleSignOut" v-if="isLoggedin">Sign Out</button></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import {onMounted, ref} from 'vue';
import {getAuth, onAuthStateChanged, signOut} from 'firebase/auth';

const isLoggedin = ref(false);
let auth 
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedin.value = true;
    } else {
      isLoggedin.value = false;
    }
  });
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    console.log("signed out");
    router.push('/');
  }).catch((error) => {
    console.log("error signing out");
  })
}
</script>

<style scoped>
#app {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px; /* Add padding to prevent content from being hidden under the navbar */
}

nav {
  position: fixed; /* Fix the navbar at the top */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff; /* Set a background color for the navbar */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle box shadow */
  z-index: 1000; /* Set a higher z-index to ensure the navbar is above other elements */
}

.navigation {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.navigation li {
  margin-right: 15px;
}

.navigation li:last-child {
  margin-right: 0;
}

.navigation a {
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  transition: color 0.3s ease-in-out;
}

.navigation a:hover {
  color: #42b983;
}

.router-link-active {
  color: #42b983;
}
</style>
