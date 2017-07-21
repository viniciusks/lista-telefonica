<template>
  <div class="container">
    <h1>Lista de Vendas</h1>
    <div class="divBack">
      <table class="table table-striped">
        <thead>
          <th v-for="coluna in colunas" class="textLeft">
            <a>{{ coluna.title }}</a>
          </th>
        </thead>
        <tbody>
          <tr>
            <td>
              <tr v-for="item in cliente" class="textLeft"><p>{{ item }}</p></tr>
            </td>
            <td>
              <tr v-for="item in qtdServicos" class="textLeft"><p>{{ item }}</p></tr>
            </td>
            <td>
              <tr v-for="item in total" class="textLeft"><p>{{ item }}</p></tr>
            </td>
            <td>
              <tr v-for="item in qtdServicos">
                <input type="text" class="btn btn-primary btnListaVendas" value="Editar">
                <input type="text" class="btn btn-danger btnListaVendas" value="Excluir">
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>  
</template>

<script>
export default {
  name: 'Lista-venda',
  data: function () {
    return {
      colunas: [
        {
          key: 'client',
          title: 'Cliente'
        },
        {
          key: 'qtdServicos',
          title: 'Qtd de serviços'
        },
        {
          key: 'total',
          title: 'Total'
        }
      ]
    }
  },
  computed: {
    cliente () {
      return this.$store.state.compraFinalizadoClientes
    },
    qtdServicos () {
      return this.$store.state.compraFinalizadoServicos
    },
    total () {
      return this.$store.state.compraFinalizadoTotal
    }
  }
}
</script>

<style>
.divBack {
  background-color: #fff;
  border-radius: 4px;
  margin: 5px;
}
.textLeft {
  text-align: left;
  padding: 0px 8px;
}
.btnListaVendas {
  margin: 0px 0px 2px 2px;
  height: 25px;
  width: 70px;
}
</style>
