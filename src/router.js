import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home.vue')
const Booking = () => import('./views/Booking.vue')
const My = () => import('./views/My.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/booking',
      name: 'booking',
      component: Booking
    },
    {
      path: '/my',
      name: 'my',
      component: My
    }
  ]
})
