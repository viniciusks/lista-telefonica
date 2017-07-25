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
            <h1>Serviços</h1>
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
                    <button class="btn btn-primary glyphicon glyphicon-plus" v-if="servico.flag == 2" @click="mudaServico(servico), getTotal(servico), pegarServico(servico)"></button>
                    <button class="btn btn-danger glyphicon glyphicon-remove" v-if="servico.flag == 1" @click="excluirServico(servico), delTotal(servico), pegarServico(servico)"></button>
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
      servicos: [
        {
          id: 0,
          name: 'Administração',
          price: 1200,
          flag: 2
        },
        {
          id: 1,
          name: 'Desenvolvimento em Vue.js',
          price: 4000,
          flag: 2
        },
        {
          id: 2,
          name: 'Desenvolvimento em Vue.js com Vuex',
          price: 6000,
          flag: 2
        },
        {
          id: 3,
          name: 'Design',
          price: 2200,
          flag: 2
        },
        {
          id: 4,
          name: 'Serviço de TI',
          price: 2000,
          flag: 2
        },
        {
          id:5,
          name: 'Marketing',
          price: 2200,
          flag: 2
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
    excluirServico: function (servico) {
      let informacao = {
        servico,
        id: this.$store.state.id
      }
      console.log(informacao.servico)
      this.$store.dispatch('excluirServico', informacao)
    },
    getTotal: function (data) {
    console.log('total')
    },
    delTotal: function (data) {
      console.log('del total')
    },
    pegarServico: function (data) {
      console.log('pegou o serviço')
    }
  }
}
</script>

<style>

</style>
