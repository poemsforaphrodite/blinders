<template>
  <div id="app">
    <nav>
      <ul class="navigation">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
        <li><router-link to="/feed">Feed</router-link></li>
        <li v-if="isLoggedin">Logged in as {{ username }}</li>
        <li><button @click="handleSignOut" v-if="isLoggedin">Sign Out</button></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
import { onMounted, ref } from 'vue';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc } from "firebase/firestore";

const isLoggedin = ref(false);
const username = ref('');
let auth
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, async (user) => {
    if (user) {
      isLoggedin.value = true;
      const db = getFirestore();
      const userRef = doc(db, "users", user.uid);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        username.value = userDoc.data().username;
      }
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


<!-- Add this to your existing styles in the same <style> block -->
<style scoped>
#app {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: #2c3e50;
  padding-top: 20px;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #34495e;
  /* Change to your preferred background color */
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
}

.navigation {
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  /* Spread the items evenly */
  align-items: center;
  padding: 10px 20px;
  /* Add padding to the navigation items */
}

.navigation li {
  margin-right: 15px;
}

.navigation li:last-child {
  margin-right: 0;
}

.navigation a {
  text-decoration: none;
  color: #ecf0f1;
  /* Change to your preferred text color */
  font-weight: bold;
  font-size: 16px;
  transition: color 0.3s ease-in-out;
}

.navigation a:hover {
  color: #e74c3c;
  /* Change to your preferred hover color */
}

button {
  background-color: #e74c3c;
  /* Change to your preferred button color */
  color: #fff;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #c0392b;
  /* Change to your preferred button hover color */
}

.router-link-active {
  color: #3498db;
  /* Change to your preferred active link color */
}</style>
