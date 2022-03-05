import { signOut, onAuthStateChanged, signInWithPopup, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import { auth } from "../firebase.js"

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const authStore = Vue.reactive({
  email: '',
  password: '',
  displayName: '',
  user: null,
  async signInWithGoogle(cb = null) {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      this.user = user

      if (cb) {
        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  async signInWithGithub(cb = null) {
    try {
      const result = await signInWithPopup(auth, githubProvider)
      const user = result.user

      this.user = user

      if (cb) {
        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  async signInWithEmailAndPassword(cb = null) {
    try {
      if (cb) {
        const result = await signInWithEmailAndPassword(auth, this.email, this.password)
        const user = result.user

        this.user = user

        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  async signUpWithEmailAndPassword(cb = null) {
    try {
      const result = await createUserWithEmailAndPassword(auth, this.email, this.password)
      await updateProfile(auth.currentUser, {
        displayName: this.displayName
      })

      const user = { ...result.user, displayName: this.displayName }

      this.user = user

      if (cb) {
        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  async signOut(cb = null) {
    try {
      await signOut(auth)

      this.user = null

      if (cb) {
        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  getCurrentUser(cb = null) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.user = user
        if (cb) {
          cb()
        }
      }
    })
  }
})
