import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './plugins/router.js'
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAIh2iGNNSPm49bM59NS3xNieCYtZaDajA",
  authDomain: "blinders-ea996.firebaseapp.com",
  projectId: "blinders-ea996",
  storageBucket: "blinders-ea996.appspot.com",
  messagingSenderId: "200335781333",
  appId: "1:200335781333:web:ff39c314ce6f1371cbe15c",
  measurementId: "G-FE8GZM3JFQ"
};

initializeApp(firebaseConfig);

createApp(App).use(router).mount('#app')

