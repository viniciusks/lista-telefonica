<template>
  <div class="container">
    <h1>Edição</h1>
    <form @submit.prevent="save">
      <label>Nome: </label>
      <input type="text" class="form-control" id="name" :value="dados[0].name" placeholder="Digite o nome do contato...">
      <label>Email: </label>
      <input type="email" class="form-control" id="email" :value="dados[0].email" placeholder="Digite o email do contato...">
      <label>Número: </label>
      <input type="text" class="form-control" id="numero" :value="dados[0].numero" placeholder="Digite o número do contato...">
      <input type="submit" class="btn btn-primary" value="Salvar">
    </form>
  </div>
</template>

<script>
export default {
  name: 'editar',
  data: function () {
    return {
      dados: this.$store.state.contatoList
    }
  },
  methods: {
    save: function () {
      this.$store.dispatch('editContato', this.dados)
    }
  }
}
</script>

<style>
input {
  margin: 5px auto;
  width: 300px !important;
}
</style>
