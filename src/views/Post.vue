<template>
  <div class="post">
    <h1>{{ post.content }}</h1>
    <p class="author">Posted by: {{ post.author }}</p>

    <!-- Display comments -->
    <div v-if="post.comments.length > 0">
      <h2>Comments</h2>
      <ul class="comments-list">
        <li v-for="comment in post.comments" :key="comment.id" class="comment-item">
          <p class="comment-content">{{ comment.content }} - <span class="comment-author">{{ comment.author }}</span></p>

          <!-- Display nested comments -->
          <div v-if="comment.comments && comment.comments.length > 0">
            <ul class="nested-comments-list">
              <li v-for="nestedComment in comment.comments" :key="nestedComment.id" class="nested-comment-item">
                <p class="nested-comment-content">{{ nestedComment.content }} - <span class="nested-comment-author">{{ nestedComment.author }}</span></p>
              </li>
            </ul>
          </div>

          <!-- Nested Comment Form -->
          <form @submit.prevent="addNestedComment(comment.id)" class="nested-comment-form">
            <label for="nestedCommentContent">Your Comment:</label>
            <textarea id="nestedCommentContent" v-model="newNestedComment.content" required class="nested-comment-textarea"></textarea>

            <button type="submit" class="nested-comment-button">Add Comment</button>
          </form>
        </li>
      </ul>
    </div>

    <!-- Comment Form -->
    <form @submit.prevent="addComment" class="comment-form">
      <label for="commentContent">Your Comment:</label>
      <textarea id="commentContent" v-model="newComment.content" required class="comment-textarea"></textarea>

      <button type="submit" class="comment-button">Add Comment</button>
    </form>

    <router-link to="/feed" class="back-link">
      <button class="back-button">Back to Feed</button>
    </router-link>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { getFirestore, doc, getDoc, collection, query, where, getDocs, addDoc } from 'firebase/firestore';
import { useRoute } from 'vue-router';

// Assuming you have a variable for the logged-in user's username
const loggedInUsername = 'yourLoggedInUsername'; // Replace with your actual variable

const route = useRoute();
const postId = route.params.id;
const post = ref({
  id: '',
  content: '',
  author: '',
  comments: [],
});

const newComment = ref({
  content: '',
  author: loggedInUsername, // Set the author to the logged-in user's username
});

const newNestedComment = ref({
  content: '',
  author: loggedInUsername, // Set the author to the logged-in user's username
});

const addComment = async () => {
  const db = getFirestore();
  const commentsCollection = collection(db, 'comments');
  
  // Add the new comment to Firestore
  await addDoc(commentsCollection, {
    postId: postId,
    content: newComment.value.content,
    author: newComment.value.author,
  });

  // Clear the form
  newComment.value = { content: '', author: '' };

  // Refetch comments to update the display
  const commentsQuery = query(commentsCollection, where('postId', '==', postId));
  const commentsSnapshot = await getDocs(commentsQuery);

  // Update comments array in the post ref
  post.value.comments = commentsSnapshot.docs.map(doc => ({
    id: doc.id,
    content: doc.data().content,
    author: doc.data().author,
  }));
};

const addNestedComment = async (commentId) => {
  const db = getFirestore();
  const nestedCommentsCollection = collection(db, 'nestedComments');

  // Add the new nested comment to Firestore
  await addDoc(nestedCommentsCollection, {
    commentId: commentId,
    content: newNestedComment.value.content,
    author: newNestedComment.value.author,
  });

  // Clear the form
  newNestedComment.value = { content: '', author: '' };

  // Refetch nested comments to update the display
  const nestedCommentsQuery = query(nestedCommentsCollection, where('commentId', '==', commentId));
  const nestedCommentsSnapshot = await getDocs(nestedCommentsQuery);

  // Update nested comments array in the comment ref
  post.value.comments.find(comment => comment.id === commentId).comments = nestedCommentsSnapshot.docs.map(doc => ({
    id: doc.id,
    content: doc.data().content,
    author: doc.data().author,
  }));
};

onMounted(async () => {
  const db = getFirestore();
  const postDoc = doc(db, 'posts', postId);
  const docSnapshot = await getDoc(postDoc);

  if (docSnapshot.exists()) {
    post.value = {
      id: docSnapshot.id,
      content: docSnapshot.data().content,
      author: docSnapshot.data().author,
      // Add any other fields you want to display
      comments: [], // Initialize comments array
    };

    // Fetch comments for the post
    const commentsCollection = collection(db, 'comments');
    const commentsQuery = query(commentsCollection, where('postId', '==', postId));
    const commentsSnapshot = await getDocs(commentsQuery);

    // Update comments array in the post ref
    post.value.comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      content: doc.data().content,
      author: doc.data().author,
    }));

    // Fetch nested comments for each comment
    const nestedCommentsCollection = collection(db, 'nestedComments');
    for (let comment of post.value.comments) {
      const nestedCommentsQuery = query(nestedCommentsCollection, where('commentId', '==', comment.id));
      const nestedCommentsSnapshot = await getDocs(nestedCommentsQuery);

      // Update nested comments array in the comment ref
      comment.comments = nestedCommentsSnapshot.docs.map(doc => ({
        id: doc.id,
        content: doc.data().content,
        author: doc.data().author,
      }));
    }
  }
});
</script>

<style scoped>
  .post {
    background-color: #f5f5f5; /* Lighter background color for posts */
    padding: 20px; /* Increased padding for a more substantial appearance */
    margin-bottom: 20px; /* Increased margin for better separation */
    border-radius: 12px; /* Further increased border radius for a rounded look */
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15); /* Enhanced box shadow for depth */
  }

  .post h1 {
    margin-bottom: 15px; /* Increased margin for better spacing */
    font-size: 32px; /* Larger font size for headings */
    color: #4a90e2; /* Royal blue for heading text */
  }

  .post p {
    color: #2c3e50; /* Dark gray text color for paragraphs */
    font-size: 20px; /* Larger font size for paragraphs */
  }

  /* Add any additional styling as needed */
</style>
