import { postStore } from "../store/post.js"

export class Home {
  setup() {
    Vue.onBeforeMount(async () => {
      await postStore.getPosts()
    })
    
    return {
      postStore
    }
  }
  
  template = `
    <div class="home">
      <h2 class="title">{{ postStore.isLoading && !postStore.posts.length? 'Carregando posts...' : 'Ultimos posts' }}</h2>
      
      
      <section class="container center" v-if="!postStore.isLoading && postStore.posts.length">
        <div v-for="post in postStore.posts" class="card">
          <header>
            <h3>{{ post.title }}</h3>
            <small>Postado em: {{ new Date(post.created_at).toLocaleString() }}</small>
          </header>
          <main>
            <img :src="post.cover" alt="Post image">
            <p>{{ post.description }}</p>
          </main>
          <footer>
            <router-link :to="'/post/'+post.id">Ler mais</router-link>
          </footer>
        </div>
      </section>
    </div>
  `
}
