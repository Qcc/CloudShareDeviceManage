import Vue from 'vue'
import Router from 'vue-router'
const TableModule = r => require.ensure([], () => r(require('../components/TableModule.vue')), 'TableModule')
const Home = r => require.ensure([], () => r(require('../pages/Home.vue')), 'Home')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TableModule',
      component: TableModule
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    }
  ]
})
