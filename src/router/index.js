import Vue from 'vue'
import Router from 'vue-router'
import SoppingMall from '@/components/pages/SoppingMall'
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/',name: 'SoppingMall',component: SoppingMall }
  ]
})
