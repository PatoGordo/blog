import { postStore } from "../store/post.js"

export class CreatePost {
  setup() {
    function clearDraft() {
      const reallyClear = confirm("Você realmente deseja limpar o rascunho?")
    
      if (reallyClear) {
        postStore.clearDraft()
      }
    }
    
    return {
      clearDraft,
      postStore
    }
  }
  
  template = `
    <div>
      <h2 class="title">Criar novo post</h2>
      
      <button @click="clearDraft" class="half outlined border-red">Limpar rescunho</button>
      
      <form @submit.prevent="postStore.savePost()" class="container">
        <label class="osr" for="title">Título do post</label>
        <input
          id="title"
          type="text"
          placeholder="Título do post"
          class="outlined"
          v-model="postStore.newPost.title"
          required
        />
        
        <label class="osr" for="created_at">Data da criação</label>
        <input
          id="created_at"
          type="datetime-local"
          placeholder="Data da criação"
          class="outlined"
          v-model="postStore.newPost.created_at"
          required
        />
        
        <label class="osr" for="cover">Link da imagem cover</label>
        <input
          id="cover"
          type="text"
          placeholder="Link da imagem cover"
          class="outlined"
          v-model="postStore.newPost.cover"
          required
        />
        
        <label class="osr" for="description">Descrição sem HTML</label>
        <textarea
          id="description"
          placeholder="Descrição (🔴HTML)"
          class="outlined"
          v-model="postStore.newPost.description"
          required
        ></textarea>
        
        <h3 class="sub-title">Preview do conteúdo</h3>
        <p v-html="postStore.newPost.content"></p>
        
        <label class="osr" for="content">Conteúdo do post</label>
        <textarea
          id="content"
          placeholder="Conteúdo (🟢HTML)"
          class="outlined"
          v-model="postStore.newPost.content"
          required
        ></textarea>
        
        <h3 class="sub-title">Referências</h3>
        <ul>
          <li v-for="ref in postStore.newPost.references"><a :href="ref.url" target="_blank">{{ ref.description }}</a></li>
        </ul>
        
        <label class="osr" for="ref-desc">Descrição da nova referência</label>
        <input
          id="ref-desc"
          type="text"
          placeholder="Descrição da nova referência"
          class="outlined"
          v-model="postStore.newPostReference.description"
        />
        
        <label class="osr" for="ref-url">Url da nova referência</label>
        <input
          id="ref-url"
          type="text"
          placeholder="Url da nova referência"
          class="outlined"
          v-model="postStore.newPostReference.url"
        />
        
        <button @click="postStore.addRef()" class="outlined half border-blue" type="button">Adicionar referência</button>
        
        <button class="outlined border-green" type="submit">Criar post</button>
      </form>
      
      <section class="container" style="margin-top: 16px;">
        <h3 class="sub-title">Preview do card</h3>
        
        <div class="card">
          <header>
            <h3>{{ postStore?.newPost?.title || 'No title yet' }}</h3>
            <small>Postado em: {{ new Date(postStore?.newPost?.created_at).toLocaleString() || 'MM/DD/YYYY, HH:MM PM' }}</small>
          </header>
          <main>
            <img :src="postStore?.newPost?.cover || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzrMUSbqOPIjIFA-cJ6tfbtQ9UFPoSdTElUQ&usqp=CAU'" alt="Post image">
            <p>{{ postStore.newPost?.description || 'Random description Random description Random description Random description Random description Random description Random description' }}</p>
          </main>
          <footer>
            <a href="#">Ler mais</a>
          </footer>
        </div>
      </section>
    </div>
  `
}
