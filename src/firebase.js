import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-app.js"
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-analytics.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.6.8/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyAGgrAm4K626ssrKaiHBdP5Il1H1rPH6Po",
  authDomain: "patogordo-ga.firebaseapp.com",
  databaseURL: "https://patogordo-ga-default-rtdb.firebaseio.com",
  projectId: "patogordo-ga",
  storageBucket: "patogordo-ga.appspot.com",
  messagingSenderId: "389441013936",
  appId: "1:389441013936:web:18ac11dfd868ac2f9fd375",
  measurementId: "G-4JQ5W5BRM0"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)
const analytics = getAnalytics

export {
  app,
  analytics,
  auth,
  db
}
