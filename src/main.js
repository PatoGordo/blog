import { App } from "./app.js"
import { router } from "./router/index.js"

const app = Vue.createApp(new App())

app.use(router)

app.mount("#app")