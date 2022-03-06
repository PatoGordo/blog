import { doc, deleteDoc, addDoc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { db } from "../firebase.js"
import { authStore } from "./auth.js"

const commentsRef = collection(db, "comments")

export const commentStore = Vue.reactive({
  comments: [],
  content: '',
  async getComments(postID) {
    this.comments = []
    let finalArray = []

    const q = query(commentsRef, where("postID", "==", postID));

    const querySnapshot = await getDocs(q)

    await Promise.all([
      querySnapshot.forEach((doc) => {
        finalArray.push({
          ...doc.data(),
          id: doc.id
        })
      })
    ])

    if (finalArray !== this.comments) {
      this.comments = finalArray
    }
  },
  async addComment(postID) {
    if (!authStore.user) {
      alert("Faça login para comentar")
    }

    await addDoc(commentsRef, {
      postID,
      uid: authStore.user.uid,
      displayName: authStore.user.displayName,
      photoURL: authStore.user.photoURL,
      content: this.content
    })

    this.comments.push({
      postID,
      uid: authStore.user.uid,
      displayName: authStore.user.displayName,
      photoURL: authStore.user.photoURL,
      content: this.content
    })

    this.content = ''
  },
  async deleteComment(id, index) {
    await deleteDoc(doc(db, "comments", id))
    
    this.comments.splice(index, 1)
  }
})
