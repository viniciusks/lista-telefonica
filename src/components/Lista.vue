<template>
  <div class="container">
    <h1>Lista de contatos</h1>
      <input type="text" class="form-control filter" id="filter" v-model="filter" placeholder="Filter...">
      <table class="table table-striped">
        <thead>
            <th v-for="coluna in colunas">
              <a href='#' @click.prevent="sortBy(coluna)">{{ coluna | ucwords }}</a>
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
              <td><button class="btn btn-primary glyphicon glyphicon-edit" @click="goToEdit(k)"></button></td>
              <td><button class="btn btn-danger glyphicon glyphicon-remove-sign" @click="remove(k)"></button></td>
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
        keys: ['nome'],
        sort: ['asc']
      },
      colunas: [
        '#',
        'nome',
        'email',
        'número'
      ],
      dados: this.$store.state.contatoList,
      filter: ''
    }
  },
  methods: {
    goToEdit: function (indice) {
      this.$router.push('/edit/' + indice)
      this.$store.dispatch('getId', indice)
    },
    remove: function (indice) {
      this.$store.dispatch('removeContato', indice)
    },
    sortBy: function (coluna) {
      this.order.keys = coluna
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc'
    }
  },
  computed: {
    dadosFiltered () {
      let colecao = _.orderBy(this.dados, this.order.keys, this.order.sort)

      return _.filter(colecao, item => {
        return item.name.indexOf(this.filter) >= 0
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

