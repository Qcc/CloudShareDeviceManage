import Vue from 'vue'
import Router from 'vue-router'
const Login = r => require.ensure([], () => r(require('../pages/Login.vue')), 'Login')
const TableModule = r => require.ensure([], () => r(require('../components/TableModule.vue')), 'Main')
const RunningSys = r => require.ensure([], () => r(require('../components/RunningSys.vue')), 'RunningSys')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
const NotFound = r => require.ensure([], () => r(require('../pages/NotFound404.vue')), 'NotFound')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    {path: '/iDevice/:id/login', name: 'login', component: Login},
    {path: '/iDevice/:id/',
      component: Main,
      children: [
        {path: 'default', component: RunningSys},
        {path: 'userManager', component: TableModule},
        {path: 'partnerManager', component: TableModule},
        {path: 'deviceManager', component: TableModule},
        {path: 'combo', component: TableModule},
        {path: 'comboGroup', component: TableModule},
        {path: 'orderManager', component: TableModule},
        {path: 'point', component: TableModule},
        {path: 'performance', component: TableModule}
      ]
    },
    {path: '*', name: 'NotFound', component: NotFound}
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
