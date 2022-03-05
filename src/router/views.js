import { Home } from "../views/home.js"
import { About } from "../views/about.js"
import { SignIn } from "../views/sign-in.js"
import { Profile } from "../views/profile.js"
import { Page404 } from "../views/404.js"

export const views = [
  {
    name: "home",
    path: "/",
    component: new Home(),
    alias: '/index.html'
  },
  {
    name: 'about',
    path: '/about',
    component: new About()
  },
  {
    name: 'sign-in',
    path: '/sign-in',
    component: new SignIn()
  },
  {
    name: 'profile',
    path: '/profile',
    component: new Profile()
  },
  {
    name: "404",
    path: "/:pathMatch(.*)*",
    component: new Page404()
  }
]
