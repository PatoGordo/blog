import { AppTopbar } from "./components/app-topbar.js"

export class App {
  components = {
    'app-topbar': new AppTopbar()
  }
  
  mounted() {
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
