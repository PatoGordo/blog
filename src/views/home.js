import { store } from "../store/main.js"

export class Home {
  setup() {
    const name = Vue.ref("")
    const isDark = Vue.ref(localStorage.getItem("theme") === "dark" ? true : false)
    const router = VueRouter.useRouter()

    function changeTheme() {
      isDark.value = !isDark.value
      const html = document.querySelector("html")

      html.classList.add("theme-change")

      if (html.className.includes("dark")) {
        html.classList.remove("dark")
        html.classList.remove("dark-navbar")
        localStorage.setItem("theme", "light")
      } else {
        html.classList.add("dark")
        html.classList.add("dark-navbar")
        localStorage.setItem("theme", "dark")
      }
    }

    function handleHello() {
      router.push(`/hello/${name.value}`)
    }

    return {
      isDark,
      changeTheme,
      handleHello,
      name,
      store
    }
  }

  template = `
    <div class="home">
      <div class="container row center" style="justify-content: space-between !important; margin-bottom: 16px;">
        <label for="theme"><strong>Dark mode</strong></label>
        <label class="switch">
          <input id="theme" @click="changeTheme" v-model="isDark" type="checkbox">
          <span class="slider rounded c-purple"></span>
        </label>
      </div>

      <h2 class="title">You clicked {{ store.count }} times!</h2>
      
      <button class="outlined border-purple" @click="store.increment()">Click here</button>
      
      <form style="margin-top: 16px" class="container" @submit.prevent="handleHello">
        <h2 class="sub-title">Recieve a hello</h2>
        
        <label class="osr" for="name">What is your name?</label>
        <input
          id="name"
          class="outlined"
          placeholder="What is your name?"
          type="text"
          v-model="name"
          required
        />
        
        <button class="outlined border-purple half" type="submit">Submit</button>
      </form>
    </div>
  `
}