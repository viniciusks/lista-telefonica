<template>
  <div class="container">
    <h1>Cadastro</h1>
    <form @submit.prevent="save">
      <label>Nome: </label>
      <input type="text" class="form-control" v-model="contato.name" id="name" placeholder="Digite o nome do contato...">
      <label>Email: </label>
      <input type="email" class="form-control" v-model="contato.email" id="email" placeholder="Digite o email do contato...">
      <label>Número: </label>
      <input type="text" class="form-control" v-model="contato.numero" id="numero" placeholder="Digite o número do contato...">
      <input type="submit" class="btn btn-primary" value="Salvar">
    </form>
  </div>
</template>

<script>
export default {
  name: 'cadastro',
  data: function () {
    return {
      contato: {
        name: '',
        email: '',
        numero: ''
      }
    }
  },
  methods: {
    save: function () {
      this.$store.dispatch('newContato', this.contato).then(() => {
        this.$router.push('/lista')
      })
    }
  },
  created () {
    this.$store.dispatch('getList')
  }
}
</script>

<style>
input {
  margin: 5px auto;
  width: 300px !important;
}
</style>

