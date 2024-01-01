<!-- Post.vue -->
<template>
    <div class="post">
      <h1>{{ post.content }}</h1>
      <p>Posted by: {{ post.author }}</p>
      <!-- Add any other post details as needed -->
      <router-link to="/feed">
        <button>Back to Feed</button>
      </router-link>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { getFirestore, doc, getDoc } from 'firebase/firestore';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const postId = route.params.id; // Get the post ID from the route params
  const post = ref({});
  
  onMounted(async () => {
    // Fetch the post from Firestore
    const db = getFirestore();
    const postDoc = doc(db, 'posts', postId);
    const docSnapshot = await getDoc(postDoc);
  
    // Update the post ref
    if (docSnapshot.exists()) {
      post.value = {
        id: docSnapshot.id,
        content: docSnapshot.data().content,
        author: docSnapshot.data().author,
        // Add any other fields you want to display
      };
    }
  });
  </script>
  
  <style scoped>
  .post {
    background-color: #ecf0f1; /* Light background color for posts */
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
  }
  
  .post h1 {
    margin-bottom: 5px;
    font-size: 24px;
  }
  
  .post p {
    color: #3498db; /* Blue color for the user name */
    font-size: 16px;
  }
  </style>
  