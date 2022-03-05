export class Page404 {
  template = `
    <div>
      <h2 class="title container center">404 - Page not found!</h2>
      
      <div class="container center">
        <span style="width: 230px; height: 230px;" class="iconify" data-icon="ph:warning-bold"></span>
      </div>
      
      <router-link class="container center" to="/">Return to home page</router-link>
    </div>
  `
}
