<template>
  <h1>{{ dados.clienteSelecionado.name }}</h1>
</template>

<script>
export default {
  name: 'EditVenda',
  data: function () {
    return {
      dados: this.$store.state.vendas[this.$store.state.id]
    }
  }
}
</script>
