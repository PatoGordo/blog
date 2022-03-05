import { AppTopbar } from "./components/app-topbar.js"
import { app, analytics } from "./firebase.js"

import { authStore } from "./store/auth.js"

export class App {
  components = {
    'app-topbar': new AppTopbar()
  }

  mounted() {
    authStore.getCurrentUser()
    
    analytics(app)
    
    const html = document.querySelector("html")

    if (localStorage.getItem("theme") === "dark") {
      html.classList.add("dark")
      html.classList.add("dark-navbar")
    }
  }

  template = `
    <app-topbar />
    <router-view class="container distance page" />
  `
}
