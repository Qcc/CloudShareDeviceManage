import Vue from 'vue'
import Router from 'vue-router'
const Demo = r => require.ensure([], () => r(require('../test/demo.vue')), 'Demo')
const Login = r => require.ensure([], () => r(require('../pages/Login.vue')), 'Login')
// const topNva = r => require.ensure([], () => r(require('../components/TopNav.vue')), 'Main')
// const LeftMenu = r => require.ensure([], () => r(require('../components/LeftMenu.vue')), 'Main')
const TableModule = r => require.ensure([], () => r(require('../components/TableModule.vue')), 'Main')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/', component: Login},
    {path: '/login', name: 'login', component: Login},
    {path: '/:id',
      component: Main,
      children: [
        {path: 'default', component: Demo},
        {path: 'userManager', component: TableModule},
        {path: 'partnerManager', component: TableModule},
        {path: 'deviceManager', component: TableModule},
        {path: 'combo', component: TableModule},
        {path: 'orderManager', component: TableModule},
        {path: 'point', component: TableModule},
        {path: 'performance', component: Demo}
      ]
    },
    {path: '*', name: 'NotFound', component: Demo}
  ]
})

    // 云享管理员
    // 云享运维员
    // {path: '/2031278906/:id',
    //   components: {
    //     topNva: topNva,
    //     leftMenu: LeftMenu,
    //     tableModule: TableModule
    //   }
    // },
    // 伙伴管理员
    // {path: '/-2139060392/:id',
    //   components: {
    //     topNva: topNva,
    //     leftMenu: LeftMenu,
    //     tableModule: TableModule
    //   }
    // },
    // 伙伴运维员
    // {path: '/-2134008167/:id',
    //   components: {
    //     topNva: topNva,
    //     leftMenu: LeftMenu,
    //     tableModule: TableModule
    //   }
    // },
