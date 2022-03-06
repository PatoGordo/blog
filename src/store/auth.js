import { signOut, onAuthStateChanged, signInWithPopup, updateProfile, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import { auth } from "../firebase.js"

const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()

export const authStore = Vue.reactive({
  email: '',
  password: '',
  displayName: '',
  user: null,
  haveUser: false,
  canCreatePosts: false,
  async signInWithGoogle(cb = null) {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result.user

      this.user = user
      this.haveUser = true

      if (user.uid === "1DA3osrsytSVEZLErON6jhQxjO72" || user.uid == "oTbWyKZAh8VyzzTJ6UuS4YP3Iea2") {
        this.canCreatePosts = true
      }

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
      this.haveUser = true

      if (user.uid === "1DA3osrsytSVEZLErON6jhQxjO72" || user.uid == "oTbWyKZAh8VyzzTJ6UuS4YP3Iea2") {
        this.canCreatePosts = true
      }

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
        this.haveUser = true

        if (user.uid === "1DA3osrsytSVEZLErON6jhQxjO72" || user.uid == "oTbWyKZAh8VyzzTJ6UuS4YP3Iea2") {
          this.canCreatePosts = true
        }

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
      this.haveUser = true

      if (user.uid === "1DA3osrsytSVEZLErON6jhQxjO72" || user.uid == "oTbWyKZAh8VyzzTJ6UuS4YP3Iea2") {
        this.canCreatePosts = true
      }

      if (cb) {
        cb()
      }
    } catch (err) {
      alert(err.message)
    }
  },
  async signOut(cb = null) {
    try {
      const reallySignOut = confirm("Você realmente deseja encerrar a sessão?")

      if (!reallySignOut) {
        return
      } else {
        await signOut(auth)

        this.user = null
        this.haveUser = false

        if (cb) {
          cb()
        }
      }
    } catch (err) {
      alert(err.message)
    }
  },
  getCurrentUser(cb = null) {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authStore.user = user
        this.haveUser = true

        if (user.uid === "1DA3osrsytSVEZLErON6jhQxjO72" || user.uid == "oTbWyKZAh8VyzzTJ6UuS4YP3Iea2") {
          authStore.canCreatePosts = true
        }

        if (cb) {
          cb()
        }
      }
    })
  }
})
