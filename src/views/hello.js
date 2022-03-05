export class Hello {
  template = `
    <div>
      <h2 class="title">👋 Hello {{ $route.params.name }}!</h2>
      <router-link to="/" class="button-like">Return to home</router-link>
    </div>
  `
}
