<template>
  <div class="container">
    <h1>Lista de contatos</h1>
      <table class="table table-striped">
        <thead>
            <th v-for="coluna in colunas">
              <a>{{ coluna }}</a>
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
export default {
  name: 'lista',
  data: function () {
    return {
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
    },
    editarRegistro: function (indice) {
      this.$store.state.contatoList[indice].name = "Jessé";
    },
    editaModel: function (indice,e) {
      let valor = e.target.value
      this.$store.state.contatoList[indice].name = valor;
    }
  }
}
</script>

<style>
  td {
    text-align: left
  }
</style>

