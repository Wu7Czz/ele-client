import Vue from 'vue'
import Router from 'vue-router'

import Home from './views/Home.vue'
import Booking from './views/Booking.vue'
import My from './views/My.vue'

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
