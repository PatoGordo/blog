import { collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { db } from "../firebase.js"

export const postStore = Vue.reactive({
  posts: [],
  isLoading: false,
  async getPosts() {
    this.isLoading = true
    
    const querySnapshot = await getDocs(collection(db, "posts"))
    
    await Promise.all([
      querySnapshot.forEach((doc) => {
        this.posts.push({
          ...doc.data(),
          id: doc.id
        })
      })
    ])
    
    this.isLoading = false
  }
})
