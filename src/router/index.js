import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import welcome from '@/components/welcome/welcome.vue'
import users from '@/components/users/users.vue'

Vue.use(Router)

// export default new Router({
const router =  new Router({
  routes: [
    {
      name:'login',
      path: '/login',
      component:Login
    },
    {
      name:'home',
      path: '/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {path:'/welcome', component:welcome},
        {path:'/users', component:users},
      ]
    }
  ]
})

router.beforeEach((to,from,next) => {
  // to 将要访问的路径
  // from 代表从哪一个路径跳转而来
  // next 是一个函数，代表放行
  //      next（） 放行   next（‘login’）强制跳转

  if(to.path === '/login' ) return next();

  const tokenStr = window.sessionStorage.getItem('token')
  if(!tokenStr) return next('/login')
  next()

})

export default router
