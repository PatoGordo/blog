import { authStore } from "../store/auth.js"

export class SignIn {
  setup() {
    const isSignIn = Vue.ref(true)
    const router = VueRouter.useRouter()
    
    Vue.onBeforeMount(() => {
      if (authStore.user) {
        router.push('/profile')
      }
    })
    
    function afterSignIn() {
      router.push('/profile')
    }
    
    async function signInOrUp() {
      if (isSignIn.value) {
        await authStore.signInWithEmailAndPassword(afterSignIn)
      } else {
        await authStore.signUpWithEmailAndPassword(afterSignIn)
      }
    }
    
    return {
      authStore,
      afterSignIn,
      isSignIn,
      signInOrUp
    }
  }
  
  template = `
    <div class="h-center">
      <h2 class="title">Login com plataformas</h2>
      
      <section class="container center" style="margin-bottom: 16px;">
        <button @click="authStore.signInWithGoogle(afterSignIn)" class="outlined container row center">
          <span class="iconify icon" data-icon="flat-color-icons:google"></span>
          Entrar com Google
        </button>
        
        <button @click="authStore.signInWithGithub(afterSignIn)" class="bg-black c-white container row center">
          <span class="iconify icon" data-icon="akar-icons:github-fill"></span>
          Entrar com Github
        </button>
      </section>
      
      <h2 class="title">{{ isSignIn? 'Login com email e senha' : 'Crie uma conta no blog'}}</h2>
      
      <form @submit.prevent="signInOrUp" class="container">
        <label class="osr" for="email">Seu email</label>
        <input
          class="outlined"
          id="email"
          type="text"
          placeholder="Seu email"
          v-model="authStore.email"
          required
        />
        
        <label class="osr" for="name" v-if="!isSignIn">Nome do seu perfil</label>
        <input
          v-if="!isSignIn"
          class="outlined"
          id="name"
          type="text"
          placeholder="Nome do seu perfil"
          v-model="authStore.displayName"
          required
        />
        
        <label class="osr" for="password">Sua senha</label>
        <input
          class="outlined"
          id="password"
          type="password"
          placeholder="Sua senha"
          v-model="authStore.password"
          required
        />
        
        <a style="text-decoration: underline; margin: 8px 0;" @click="isSignIn = !isSignIn">{{ isSignIn? 'Ainda não tenho uma conta' : 'Já tenho uma conta'}}</a>
        
        <button class="outlined border-purple">{{ isSignIn? 'Entrar' : 'Registrar'}}</button>
      </form>
    </div>
  `
}
