import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/layout/Login'
import Home from '@/components/layout/Home'
import Ybmb from '@/components/ybmb/ybmb'
import Ybsp from '@/components/ybmb/ybsp'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      redirect:'/Home/ybmb',
      children:[
        {
          path:"ybmb",
          name:"Ybmb",
          component:Ybmb
        },
        {
          path:"ybsp",
          name:"Ybsp",
          component:Ybsp
        }
      ]
    }
  ]
})
