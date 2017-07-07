import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cadastro from '../components/Cadastro'
import Lista from '../components/Lista'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/cadastro',
      component: Cadastro
    },
    {
      path: '/lista',
      component: Lista
    }
  ]
})
