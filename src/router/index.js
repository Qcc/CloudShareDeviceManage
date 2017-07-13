import Vue from 'vue'
import Router from 'vue-router'
const Demo = r => require.ensure([], () => r(require('../test/demo.vue')), 'Demo')
const Login = r => require.ensure([], () => r(require('../pages/Login.vue')), 'Login')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', name: 'Login', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {path: '/Main/:id', name: 'Main', component: Main},
    {path: '*', name: 'NotFound', component: Demo}
  ]
})
