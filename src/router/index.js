import Vue from 'vue'
import Router from 'vue-router'
const Demo = r => require.ensure([], () => r(require('../test/demo.vue')), 'Demo')
const Login = r => require.ensure([], () => r(require('../pages/Login.vue')), 'Login')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
const Feedback = r => require.ensure([], () => r(require('../pages/Feedback.vue')), 'Feedback')
const HotelManagement = r => require.ensure([], () => r(require('../pages/HotelManagement.vue')), 'HotelManagement')
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', name: 'Login', component: Login},
    {path: '/HotelManagement', name: 'HotelManagement', component: HotelManagement},
    {path: '/login', name: 'Login', component: Login},
    {path: '/main', name: 'Main', component: Main},
    {path: '/feedback', name: 'Feedback', component: Feedback},
    {path: '*', name: 'NotFound', component: Demo}
  ]
})
