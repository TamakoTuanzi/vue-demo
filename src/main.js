// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Layout from './components/layout'
import VRouter from 'vue-router'
import VRexource from 'vue-resource'
import IndexPage from './pages/index'
import DetailPage from './pages/detail'
import AnaPage from './pages/detail/analysis'
import ConPage from './pages/detail/count'
import ForPage from './pages/detail/forecast'
import PubPage from './pages/detail/publish'
import OrderPage from './pages/orderList'
import store from './store'

Vue.use(VRouter)
Vue.use(VRexource)
Vue.config.productionTip = false

let router = new VRouter({
  mode:'history',
  routes:[
    {
      path:'/',
      component: IndexPage
    },
    {
      path:'/orderList',
      component: OrderPage
    },
    {
      path:'/detail',
      component: DetailPage,
      redirect:'/detail/count',
      children:[
        {
          path:'analysis',
          component: AnaPage
        },
        {
          path:'count',
          component: ConPage
        },
        {
          path:'forecast',
          component: ForPage
        },
        {
          path:'publish',
          component: PubPage
        }
      ]
    }
  ]
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<Layout/>',
  components: { Layout }
})
