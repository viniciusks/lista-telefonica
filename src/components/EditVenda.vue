<template>
  <div class="row">
    <div class="container">
      <h1>Edição de vendas</h1>
      <div class="col-md-4 divBack1">
        <div class="row">
          <h3 class="textLeft">Serviços selecionados</h3>
          <p v-if="verificaServicos()" class="textLeft"><b>Nome:</b></p>
          <div v-for="servico in dados.servicos" v-if="servico.flag == 1">
            <li class="textLeft">{{ servico.name }}</li>
          </div>
          <p v-if="verificaServicos()" class="textLeft"><b>Preço:</b></p>
          <div v-for="servico in dados.servicos" v-if="servico.flag == 1">
            <li class="textLeft">R$ {{ servico.price }},00</li>
          </div>
          <p class="textLeft"><b>Total:</b></p>
          <li class="textLeft">R$ {{ this.dados.total }},00</li>
        </div>
        <div class="row">
          <h3 class="textLeft">Cliente selecionado</h3>
          <p class="textLeft">{{ this.dados.clienteSelecionado.name }}</p>
        </div>
      </div>
      <div class="col-md-8 divBack2">
        <div class="row">
          <div class="divServico">
            <h1>Serviços selecionados</h1>
            <table class="table table-striped">
              <thead>
                <th v-for="coluna in colunas" class="textLeft">
                  <a>{{ coluna.title }}</a>
                </th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="servico in dados.servicos" class="textLeft">
                  <td>{{ servico.name }}</td>
                  <td>R$ {{ servico.price }},00</td>
                  <td>
                    <button class="btn btn-danger glyphicon glyphicon-remove" v-if="servico.flag == 1" @click="mudaFlagRemove(servico.id), excluirServico(servico), delTotal(servico)"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="divServico">
            <h1>Serviços</h1>
            <table class="table table-striped">
              <thead>
                <th v-for="coluna in colunas" class="textLeft">
                  <a>{{ coluna.title }}</a>
                </th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="servico in servicos" class="textLeft">
                  <td>{{ servico.name }}</td>
                  <td>R$ {{ servico.price }},00</td>
                  <td>
                    <button v-bind:class="['btn btn-primary glyphicon glyphicon-plus', servico.flag == 1 ? 'disabled' : '']" @click="mudaFlagPlus(servico), getTotal(servico), incluirServico(servico), mudarFlag(servico)"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EditVenda',
  data: function () {
    return {
      dados: this.$store.state.vendas[this.$store.state.id],
      controleBotoes: 1,
      colunas: [
        {
          key: 'name',
          title: 'Nome'
        },
        {
          key: 'price',
          title: 'Preço'
        }
      ],
      colunas2: [
        {
          key: 'name',
          title: 'Nome'
        },
        {
          key: 'email',
          title: 'E-mail'
        },
        {
          key: 'numero',
          title: 'Número'
        }
      ],
      order: {
        keys: 'name',
        sort: 'asc'
      }
    }
  },
  methods: {
    verificaServicos: function (){
      let retorno = false
      for(let i=0;i<this.dados.servicos.length;i++){
          if(this.dados.servicos[i].flag == '1'){
            retorno = true
        }
      }
      return retorno
    },
    mudarFlag: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id
      }
      this.$store.dispatch('getFlag', informacao)
    },
    mudaFlagPlus: function (data) {
      for (let i=0;i<this.dados.servicos.length;i++) {
        if (this.dados.servicos[i].name == data.name) {
          data.flag = this.dados.servicos[i].flag
        }
      }
      return data.flag
    },
    mudaFlagRemove: function (indice) {
      for (let i=0;i<this.dados.servicos.length;i++) {
        if (this.dados.servicos[i].name == this.servicos[indice].name) {
          this.servicos[indice].flag = 2
        }
      }
      return this.servicos[indice].flag
    },
    incluirServico: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id,
        qtdServicos: this.$store.state.vendas[this.$store.state.id].qtdServicos
      }
      this.$store.dispatch('incluirServicoAct', informacao)
      this.$store.dispatch('syncIndiceServico', informacao)
    },
    excluirServico: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id,
        qtdServicos: this.$store.state.vendas[this.$store.state.id].qtdServicos
      }
      this.$store.dispatch('syncIndiceServico', informacao)
      this.$store.dispatch('excluirServico', informacao)
    },
    getTotal: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id
      }
      this.$store.dispatch('getTotalVendaAct', informacao)
    },
    delTotal: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id
      }
      this.$store.dispatch('delTotalVendaAct', informacao)
    }
  },
  mounted: function () {
    if (this.$store.state.servicosList.length == 0) {
      this.$store.dispatch('newServico', {
        id: 0,
        name: 'Administração',
        price: 1200,
        flag: 2
      })
      this.$store.dispatch('newServico', {
        id: 1,
        name: 'Desenvolvimento em Vue.js',
        price: 4000,
        flag: 2
      })
      this.$store.dispatch('newServico', {
        id: 2,
        name: 'Desenvolvimento em Vue.js com Vuex',
        price: 6000,
        flag: 2
      })
      this.$store.dispatch('newServico', {
        id: 3,
        name: 'Design',
        price: 2200,
        flag: 2
      })
      this.$store.dispatch('newServico', {
        id: 4,
        name: 'Serviço de TI',
        price: 2000,
        flag: 2
      })
      this.$store.dispatch('newServico', {
        id:5,
        name: 'Marketing',
        price: 2200,
        flag: 2
      })
    }
    for (let i=0;i<this.dados.servicos.length;i++) {
      for (let j=0;j<this.servicos.length;j++){
        if (this.dados.servicos[i].name == this.servicos[j].name) {
          this.servicos[j].flag = this.dados.servicos[i].flag
        }
      }
    }
  },
  computed: {
    servicos () {
      let colecao = this.$store.state.servicosList
      return colecao
    }
  }
}
</script>

<style>

</style>
