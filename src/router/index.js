import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Cadastro from '../components/Cadastro'
import Lista from '../components/Lista'
import Edit from '../components/Edit'
import CadastroVenda from '@/components/CadastroVenda'
import ListaVenda from '@/components/ListaVenda'
import EditVenda from '@/components/EditVenda'

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
    },
    {
      path: '/edit/:id',
      component: Edit
    },
    {
      path: '/cadastro-venda',
      component: CadastroVenda
    },
    {
      path: '/lista-venda',
      component: ListaVenda
    },
    {
      path: '/edit-compra/:id',
      component: EditVenda
    }
  ]
})
