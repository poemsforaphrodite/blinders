<template>
  <div class="post-form">
    <textarea v-model="postContent" placeholder="Write your post..."></textarea>
    <button @click="submitPost">Post</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc , doc, getDoc} from 'firebase/firestore';

const postContent = ref('');

const submitPost = async () => {
  // Check if the user is logged in
  const auth = getAuth();
  const user = auth.currentUser;

  if (user) {
    // Fetch the user document from Firestore
    const db = getFirestore();
    const userDoc = doc(db, 'users', user.uid);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const userData = userSnapshot.data();

      // Save the post to the database (Firestore)
      const postsCollection = collection(db, 'posts');

      try {
        await addDoc(postsCollection, {
          content: postContent.value,
          userId: user.uid,
          author: userData.username, // Use the username from the user document
          // Add other relevant fields as needed
        });

        // Reset the postContent after successful submission
        postContent.value = '';
      } catch (error) {
        console.error('Error saving post:', error);
      }
    } else {
      console.log("User document does not exist");
      // Handle the case where the user document does not exist (optional)
    }
  } else {
    console.log("Login required to make a post");
    // Handle the case where the user is not logged in (optional)
  }
};
</script>


  
<style scoped>
.post-form {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #f5f5f5;
  /* Light background color */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  background-color: #3498db;
  /* Blue button color */
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s ease-in-out;
}

button:hover {
  background-color: #2980b9;
  /* Darker blue on hover */
}
</style>
  