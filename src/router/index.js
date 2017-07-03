import Vue from 'vue'
import Router from 'vue-router'
const Demo = r => require.ensure([], () => r(require('../demo.vue')), 'Demo')
const Home = r => require.ensure([], () => r(require('../pages/Home.vue')), 'Home')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
const Feedback = r => require.ensure([], () => r(require('../pages/Feedback.vue')), 'Feedback')
const HotelManagement = r => require.ensure([], () => r(require('../pages/HotelManagement.vue')), 'HotelManagement')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/hotelManagement',
      name: 'HotelManagement',
      component: HotelManagement
    },
    {
      path: '/Demo',
      name: 'Demo',
      component: Demo
    }
  ]
})
