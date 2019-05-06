import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('./views/Home.vue')
const Booking = () => import('./views/Booking.vue')
const My = () => import('./views/My.vue')
// const StudentManagement = () => import('./views/My-StudentManagement.vue')
// const ClassManagement = () => import('./views/My-ClassManagement.vue')
// const GradeMnagement = () => import('./views/My-GradeManagement.vue')
const UnitManagement = () => import('./views/My-UnitManagement.vue')

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
      component: My,
      children: [
        {
          path: 'unitm/:classify',
          component: UnitManagement
        }
      ]
    }
  ]
})
