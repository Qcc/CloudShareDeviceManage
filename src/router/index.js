import Vue from 'vue'
import Router from 'vue-router'
const Login = r => require.ensure([], () => r(require('../pages/Login.vue')), 'Login')
const TableModule = r => require.ensure([], () => r(require('../components/TableModule.vue')), 'Main')
const RunningSys = r => require.ensure([], () => r(require('../pages/RunningSys.vue')), 'RunningSys')
const OpenDevice = r => require.ensure([], () => r(require('../pages/OpenDevice.vue')), 'OpenDevice')
const Main = r => require.ensure([], () => r(require('../pages/Main.vue')), 'Main')
const NotFound = r => require.ensure([], () => r(require('../pages/NotFound404.vue')), 'NotFound')
const NumberManager = r => require.ensure([], () => r(require('../pages/NumberManager.vue')), 'NumberManager')
const RevenueClose = r => require.ensure([], () => r(require('../pages/RevenueClose.vue')), 'RevenueClose')
const PersonnelChart = r => require.ensure([], () => r(require('../components/personnelChart.vue')), 'PersonnelChart')
const DeviceChart = r => require.ensure([], () => r(require('../components/deviceChart.vue')), 'DeviceChart')
const OrderChart = r => require.ensure([], () => r(require('../components/orderChart.vue')), 'OrderChart')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/idev/:id/login', name: 'login', component: Login },
    {
      path: '/idev/:id/',
      component: Main,
      children: [
        { path: 'default', component: RunningSys },
        { path: 'userManager', component: TableModule },
        { path: 'partnerManager', component: TableModule },
        { path: 'deviceManager', component: TableModule },
        { path: 'deviceId', component: NumberManager },
        { path: 'combo', component: TableModule },
        { path: 'comboGroup', component: TableModule },
        { path: 'orderManager', component: TableModule },
        { path: 'guke', component: TableModule },
        { path: 'point', component: TableModule },
        { path: 'personnelChart', component: PersonnelChart },
        { path: 'deviceChart', component: DeviceChart },
        { path: 'orderChart', component: OrderChart },
        { path: 'openDevice', component: OpenDevice },
        { path: 'revenueClose', component: RevenueClose },
      ]
    },
    { path: '*', name: 'NotFound', component: NotFound }
  ]
});