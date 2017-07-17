<template>
  <div class="container">
    <h1>Lista de contatos</h1>
      <input type="text" class="form-control filter" id="filter" placeholder="Filter...">
      <table class="table table-striped">
        <thead>
            <th v-for="coluna in colunasFiltered">
              <a href='#' @click.prevent="sortBy(coluna)">{{ coluna }}</a>
            </th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="(item,k) in dados">
              <td>{{ k + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.numero }}</td>
              <td><button class="btn btn-primary glyphicon glyphicon-edit" v-on:click="goToEdit(k)"></button></td>
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
        keys: ['#'],
        sort: ['desc']
      },
      colunas: [
        '#',
        'Nome',
        'Email',
        'Número'
      ],
      dados: this.$store.state.contatoList
    }
  },
  methods: {
    goToEdit: function (indice) {
      this.$router.push('/edit/' + indice)
      this.$store.dispatch('getId', indice)
    },
    sortBy: function (coluna) {
      console.log('deu certo')
      this.order.keys = coluna
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc'
    }
  },
  computed: {
    colunasFiltered () {
      return _.orderBy(this.colunas, this.order.keys, this.order.sort)
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

