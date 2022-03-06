import { postStore } from "../store/post.js"
import { authStore } from "../store/auth.js"
import { commentStore } from "../store/comment.js"

export class Post {
  setup() {
    const route = VueRouter.useRoute()
    const id = route.params.id

    const post = Vue.ref(null)

    Vue.onMounted(async () => {
      commentStore.getComments(id)
      post.value = await postStore.getPost(id)
    })
    
    function addComment() {
      commentStore.addComment(id)
    }
    
    async function deleteComment(id, index) {
      await commentStore.deleteComment(id, index)
    }

    return {
      id,
      post,
      commentStore,
      authStore,
      addComment,
      deleteComment
    }
  }

  template = `
    <div>
      <h2 class="title">{{ post?.title || 'Esse post não existe'}}</h2>
      <small style="margin-bottom: 16px" v-if="post">Postado em: {{ new Date(post?.created_at).toLocaleString() }}</small>
      
      <img v-if="post" :src="post?.cover" style="width: 100%; height: 230px; object-fit: cover; border-radius: 4px;" alt="Post cover"/>
      
      <section v-if="post" class="container" style="margin-top: 16px">
        <p v-html="post?.content"></p>
      </section>
      
      <ul class="container" style="margin-top: 16px;">
        <li v-for="reference in post?.references"><a :href="reference.url" target="_blank">{{ reference.description }}</a></li>
      </ul>
      
      <form @submit.prevent="addComment" class="container" style="margin: 16px 0;">
        <label class="osr" for="content">Seu comentário</label>
        <textarea
          id="content"
          placeholder="Seu comentário"
          class="outlined"
          v-model="commentStore.content"
          :disabled="!authStore.haveUser"
          required
        ></textarea>
        
        <button class="outlined half border-blue" type="submit" :disabled="!authStore.haveUser">Adicionar comentário</button>
        
        <div v-if="!authStore.haveUser" class="container row h-end v-center" style="margin-top: 16px;">
          <strong>Faça login para comentar</strong>
          <button @click="authStore.signInWithGoogle()" type="button" class="container center rounded" style="width: 45px; height: 45px;">
            <span class="iconify icon c-white" data-icon="flat-color-icons:google"></span>
          </button>
          
          <button @click="authStore.signInWithGithub()" type="button" class="bg-black container center rounded" style="width: 45px; height: 45px;">
            <span class="iconify icon c-white" data-icon="akar-icons:github-fill"></span>
          </button>
        </div>
      </form>
      
      <section class="container">
        <strong v-if="!commentStore.comments.length">Ainda não tem cometários</strong>
        
        <div v-if="commentStore.comments.length" v-for="(comment, index) in commentStore.comments" class="container distance comment">
          <header class="container row">
            <img :src="comment.photoURL" :alt="comment.displayName + ' foto de perfil'" />
            <strong>{{ comment.displayName }}</strong>
          </header>
          <p>{{ comment.content }}</p>
          
          <footer v-if="authStore?.user?.uid === comment?.uid" class="container h-end v-center">
           <span @click="deleteComment(comment.id, index)"><span class="iconify icon c-red" data-icon="akar-icons:trash-bin"></span></span>
          </footer>
        </div>
      </section>
    </div>
  `
}
