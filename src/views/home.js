export class Home {
  setup() {
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

    return {
      isDark,
      changeTheme,
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

      <router-link to="/sign-in">Logar</router-link>
      <router-link to="/profile">Ver perfil</router-link>
    </div>
  `
}
