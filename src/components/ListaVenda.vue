<template>
  <div class="container">
    <h1>Lista de Vendas</h1>
    <div class="divBack">
      <table class="table table-striped">
        <thead>
          <th v-for="coluna in colunas" class="textLeft">
            <p>{{ coluna.title }}</p>
          </th>
        </thead>
        <tbody>
          <tr v-for="(item,k) in venda">
            <td class="textLeft1" @click="teste(item.clienteSelecionado)">{{ item.clienteSelecionado.name }}</td>
            <td class="textLeft1">{{ item.qtdServicos }}</td>
            <td class="textLeft1">{{ item.total }}</td>
            <td><button type="text" class="btn btn-primary btnListaVendas glyphicon glyphicon-edit" @click="goToEditCompra(k)"></button></td>
            <td><button type="text" class="btn btn-danger btnListaVendas glyphicon glyphicon-remove" @click="removeFromList(k)"></button></td>
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
  mounted: function () {
    for (let i=0;i<this.$store.state.vendas.length;i++) {
      if (this.$store.state.vendas[i].total == 0) {
        this.$store.dispatch('removeFromVenda', i)
      }
    }
  },
  methods: {
    goToEditCompra: function (indice) {
      this.$store.dispatch('getId', indice).then(() => {
        this.$router.push('/edit-compra/' + indice)
      })
    },
    removeFromList: function (indice) {
      this.$store.dispatch('removeFromVenda', indice)
    }
  },
  computed: {
    venda () {
      return this.$store.state.vendas
    },
    indiceVenda () {
      return this.$store.state.indiceVenda
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
.textLeft1 {
  text-align: left;
  padding: 15px 0px 0px 10px !important;
}
.btnListaVendas {
  margin: 0px 0px 2px 2px;
  height: 35px;
  width: 70px;
}
</style>
