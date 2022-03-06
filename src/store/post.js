import { addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"
import { db } from "../firebase.js"

export const postStore = Vue.reactive({
  newPost: localStorage.getItem('draft') ? JSON.parse(localStorage.getItem('draft')) : {
    title: '',
    created_at: new Date(new Date().setSeconds(0, 0)).toISOString().replace(':00.000Z', ''),
    cover: '',
    description: '',
    content: '',
    references: []
  },
  newPostReference: {
    description: '',
    url: ''
  },
  posts: [],
  isLoading: false,
  async savePost() {
    this.isLoading = true
    
    await addDoc(collection(db, "posts"), this.newPost)
    
    this.isLoading = false
  },
  async getPosts() {
    let finalArray = []
    this.isLoading = true

    const querySnapshot = await getDocs(collection(db, "posts"))

    await Promise.all([
      querySnapshot.forEach((doc) => {
        finalArray.push({
          ...doc.data(),
          id: doc.id
        })
      })
    ])

    if (finalArray !== this.posts) {
      this.posts = finalArray
    }

    this.isLoading = false
  },
  async getPost(id) {
    if (!this.posts.length) {
      await this.getPosts()
    }

    const post = this.posts.find(post => post.id === id)

    return post || null
  },
  addRef() {
    this.newPost.references.push({
      description: this.newPostReference.description,
      url: this.newPostReference.url
    })
    
    this.newPostReference = {
      description: '',
      url: ''
    }
  },
  clearDraft() {
    localStorage.removeItem('draft')

    this.newPost = {
      title: '',
      created_at: new Date(new Date().setSeconds(0, 0)).toISOString().replace(':00.000Z', ''),
      cover: '',
      description: '',
      content: '',
      references: []
    }
  }
})

Vue.watch(
  () => postStore.newPost,
  (val) => {
    localStorage.setItem('draft', JSON.stringify(val))
  }, { deep: true }
)
