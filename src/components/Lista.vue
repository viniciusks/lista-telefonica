<template>
  <div class="container">
    <h1>Lista de contatos</h1>
      <input type="text" class="form-control filter" id="filter" v-model="filter" placeholder="Filter...">
      <table class="table table-striped">
        <thead>
            <th v-for="coluna in colunas"> 
              <a href='#' @click.prevent="sortBy(coluna.chave)">{{ coluna.title | ucwords }}</a>
            </th>
            <th></th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="(item,k) in dadosFiltered">
              <td>{{ k + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.numero }}</td>
              <td><button class="btn btn-primary glyphicon glyphicon-edit" @click="goToEdit(item.id)"></button></td>
              <td><button class="btn btn-danger glyphicon glyphicon-remove-sign" @click="remove(item.id)"></button></td>
            </tr>
        </tbody>
      </table>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'lista',
  data: function () {
    return {
      order: {
        keys: 'name',
        sort: 'asc'
      },      
      colunas: [
        {
          chave: '#',
          title: '#'
        },
        {
          chave: 'name',
          title: 'Nome'
        },
        {
          chave: 'email',
          title: 'E-mail'
        },
        {
          chave: 'numero',
          title: 'Número'
        }
      ],
      dados: {
        inf: this.$store.state.contatoList,
        id: this.$store.state.id
      },
      filter: ''
    }
  },
  methods: {
    goToEdit: function (indice) {
      this.$store.dispatch('getId', indice).then(() => {
        this.$router.push('/edit/' + indice)      
      })      
      // console.log(indice)
    },
    remove: function (indice) {
      this.$store.dispatch('removeContato', indice)
    },
    sortBy: function (coluna) {
      this.order.keys = coluna
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc'
    }
  },
  /*mounted: function() {    
    // cria automaticamente caso esteja vazio para testes
    if(this.$store.state.contatoList.length == 0){
                
      this.$store.dispatch('newContato', {name: 'Vinícius',email: 'vinicius@ootz.com.br',numero: '42 9 9991-8821'})
      this.$store.dispatch('newContato', {name: 'Klaus',email: 'klaus@ootz.com.br',numero: '41 9 9856-7546'})
      this.$store.dispatch('newContato', {name: 'Sandra',email: 'sandra@ootz.com.br',numero: '42 9 9950-7220'})          
      this.$store.dispatch('newContato', {name: 'Joel',email: 'joel@ootz.com.br',numero: '42 9 9980-9749'})

    }
  },*/ 
  computed: {
    dadosFiltered () {
      let colecao = _.orderBy(this.dados.inf, this.order.keys, this.order.sort)
      
      return _.filter(colecao, item => {   
        return item.name.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(this.filter.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) >= 0
      })
    }
  },
  filters: {
    ucwords (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>

<style>
  td {
    text-align: left
  }
  .filter {
    width: 100%;
    margin: 5px auto;
  }
</style>

