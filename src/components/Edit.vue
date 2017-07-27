<template>
  <div class="container">
    <h1>Edição</h1>
    <form @submit.prevent="save">
      <label>Nome: </label>
      <input type="text" class="form-control edit" id="name" v-model="dados.inf.name" placeholder="Digite o nome do contato...">
      <label>Email: </label>
      <input type="email" class="form-control edit" id="email" v-model="dados.inf.email" placeholder="Digite o email do contato...">
      <label>Número: </label>
      <input type="text" class="form-control edit" id="numero" v-model="dados.inf.numero" placeholder="Digite o número do contato...">
      <input type="submit" class="btn btn-primary" value="Salvar">
    </form>
  </div>
</template>

<script>
export default {
  name: 'editar',
  data: function () {
    return {
      dados: {
        inf: this.$store.state.contatoList[this.$store.state.id],
        id: this.$store.state.id
      }
    }
  },
  methods: {
    save: function () {
      this.$store.dispatch('editContato', this.dados).then(() => {
        this.$router.push('/lista')
      })
    }
  }
}
</script>

<style>
  .edit {
    margin: 5px auto;
    width: 300px !important;
  }
  input:focus{
  border: 1px solid #41b883 !important;
  }
</style>
