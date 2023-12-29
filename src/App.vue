<template>
  <div id="app">
    <nav>
      <ul class="navigation">
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/login">Login</router-link></li>
        <li><router-link to="/signup">Signup</router-link></li>
      </ul>
    </nav>
    <router-view />
  </div>
</template>

<script setup>
import { RouterView, RouterLink } from 'vue-router'
</script>

<style scoped>
#app {
  font-family: 'Poppins', sans-serif;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-bottom: 40px;
}

.navigation {
  list-style-type: none;
  padding: 0;
}

.navigation li {
  display: inline-block;
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
