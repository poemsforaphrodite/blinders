<!-- Feed.vue -->
<template>
    <div>
      <h1>THIS IS DA FEED</h1>
      <router-link to="/postform">
        <button>Go to Post Form</button>
      </router-link>
  
      <!-- Display all posts -->
      <div v-for="post in posts" :key="post.id" class="post">
        <p>{{ post.content }}</p>
        <span>Posted by: {{ post.userName }}</span>
        <!-- Add any other post details as needed -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getFirestore, collection, getDocs } from 'firebase/firestore';
  
  const posts = ref([]);
  
  onMounted(async () => {
    // Fetch all posts from Firestore
    const db = getFirestore();
    const postsCollection = collection(db, 'posts');
    const querySnapshot = await getDocs(postsCollection);
  
    // Map Firestore documents to an array and update the posts ref
    posts.value = querySnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      userId: doc.data().userId,
      // Add any other fields you want to display
    }));
  
    // Optionally, fetch user information for each post (username, etc.)
    // and update the posts array with the additional details
  });
  </script>
  
  <style scoped>
  .post {
    background-color: #ecf0f1; /* Light background color for posts */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
  
  .post p {
    margin-bottom: 5px;
    font-size: 16px;
  }
  
  .post span {
    color: #3498db; /* Blue color for the user name */
    font-size: 14px;
  }
  </style>
  