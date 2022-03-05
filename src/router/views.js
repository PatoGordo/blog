import { Home } from "../views/home.js"
import { Hello } from "../views/hello.js"
import { About } from "../views/about.js"
import { Page404 } from "../views/404.js"

export const views = [
  {
    name: "home",
    path: "/",
    component: new Home(),
    alias: '/index.html'
  },
  {
    name: 'hello',
    path: '/hello/:name',
    component: new Hello()
  },
  {
    name: 'about',
    path: '/about',
    component: new About()
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: new Page404()
  }
]