import { authStore } from "../store/auth.js"

export class AppTopbar {
  setup() {
    const isOpen = Vue.ref(false)

    return {
      isOpen,
      authStore
    }
  }

  template = `
    <nav class="navbar responsive bg-purple" :class="isOpen? 'open' : ''">
      <span @click="$router.go(-1)" v-if="$route.name !== 'home'">
        <span class="iconify icon" data-icon="akar-icons:arrow-left"></span>
      </span>
      
      <h1 @click="$router.push('/')">
        PatoGordo Blog
      </h1>
      
      <ul class="content">
        <li><router-link to="/">Início</router-link></li>
        <li><router-link to="/about">Sobre</router-link></li>
        <li><router-link to="/settings">Configurações</router-link></li>
        <li><router-link to="/sign-in">{{ authStore.user ? 'Perfil' : 'Entrar' }}</router-link></li>
        <li v-if="authStore.canCreatePosts"><router-link to="/create-post">Novo post</router-link></li>
        <li><a href="https://github.com/PatoGordo/blog">Github</a></li>
      </ul>
      
      <span @click="isOpen = !isOpen" class="toggler">
        <span class="iconify icon toggler" data-icon="charm:menu-hamburger"></span>
      </span>
    </nav>
    
    <ul class="mobile-content bg-purple container center" :class="isOpen? 'open' : ''" @click="isOpen = !isOpen">
      <li><router-link to="/">Início</router-link></li>
      <li><router-link to="/about">Sobre</router-link></li>
      <li><router-link to="/settings">Configurações</router-link></li>
      <li><router-link to="/sign-in">{{ authStore.user ? 'Perfil' : 'Entrar' }}</router-link></li>
      <li v-if="authStore.canCreatePosts"><router-link to="/create-post">Novo post</router-link></li>
      <li><a href="https://github.com/PatoGordo/blog">Github</a></li>
    </ul>
  `
}
