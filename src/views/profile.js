import { authStore } from "../store/auth.js"

export class Profile {
  setup() {
    const router = VueRouter.useRouter()
    
    Vue.onBeforeMount(() => {
      if (!authStore.user) {
        router.push('/sign-in')
      }
    })
    
    function afterSignOut() {
      router.push('/')
    }
    
    return {
      afterSignOut,
      authStore
    }
  }
  
  template = `
    <div class="h-center">
      <img class="container center" :src="authStore?.user?.photoURL || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhBGZToHsXARFonCcmA4G6u3CHluftec9Zmg&usqp=CAU'" style="width: 210px; height: 210px: object-fit: cover; border-radius: 50%;" />
    
      <h2 class="title container center">{{ authStore?.user?.displayName || 'Guest' }}</h2>
      
      <button @click="authStore.signOut(afterSignOut)" class="outlined half border-red">Encerrar sessão</button>
    </div>
  `
}
