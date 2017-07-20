<template>
  <div class="row">
    <div class="container">
      <div class="col-md-4 divBack1">
        <div class="row">
          <h3 class="textLeft">Serviços selecionados</h3>
          <p v-if="verificaServicos()" class="textLeft"><b>Nome:</b></p>
          <div v-for="servico in servicos" v-if="servico.flag == 1">
            <li class="textLeft">{{ servico.name }}</li>
          </div>
          <p v-if="verificaServicos()" class="textLeft"><b>Preço:</b></p>
          <div v-for="servico in servicos" v-if="servico.flag == 1">
            <li class="textLeft">{{ servico.price }}</li>
          </div>
          <p v-if="verificaServicos()" class="textLeft"><b>Total:</b></p>
          <!-- área onde o total será exibido -->
        </div>
        <div class="row">
          <h3 class="textLeft">Cliente selecionado</h3>
          <p class="textLeft">
            {{ this.$store.state.clienteSelecionado.name }}
            <button class="btn btn-danger glyphicon glyphicon-remove" v-if="controleBotoes == 1" @click="tirarInformacao(), changeControleBotoes(controleBotoes)"></button>
          </p>
        </div>
      </div>
      <div class="col-md-8 divBack2">
        <div class="row">
          <div class="divServico">
            <h1>Serviços disponíveis</h1>
            <table class="table table-striped">
              <thead>
                <th v-for="coluna in colunas" class="textLeft">
                  <a>{{ coluna.title }}</a>
                </th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="servico in servicosFiltered" class="textLeft">
                  <td>{{ servico.name }}</td>
                  <td>{{ servico.price }}</td>
                  <td>
                    <button class="btn btn-primary glyphicon glyphicon-plus" v-if="servico.flag == 2" v-on:click="servico.flag = 1"></button>
                    <button class="btn btn-danger glyphicon glyphicon-remove" v-if="servico.flag == 1" v-on:click="servico.flag = 2"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="divServico">
            <h1>Clientes disponíveis</h1>
            <table class="table table-striped">
              <thead>
                <th v-for="coluna in colunas2" class="textLeft">
                  <a href="#" @click.prevent="sortBy(coluna.key)">{{ coluna.title }}</a>
                </th>
                <th></th>
              </thead>
              <tbody>
                <tr v-for="item in dadosFiltered">
                  <td class="textLeft">{{ item.name }}</td>
                  <td class="textLeft">{{ item.email }}</td>
                  <td class="textLeft">{{ item.numero }}</td>
                  <td class="textLeft">
                    <button class="btn btn-primary glyphicon glyphicon-plus" v-if="controleBotoes == 2" @click="pegaInformacao(item.id), changeControleBotoes(controleBotoes)"></button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <button class="btn btn-primary btnAdd" @click="permicaoCadastro = 1"><span class="glyphicon glyphicon-plus"></span>Adicionar cliente</button>
          <div v-if="permicaoCadastro == 1">
            <form @submit.prevent="save">
              <label>Nome: </label>
              <input type="text" class="form-control cadastro" v-model="contato.name" id="name" placeholder="Digite o nome do contato...">
              <label>Email: </label>
              <input type="email" class="form-control cadastro" v-model="contato.email" id="email" placeholder="Digite o email do contato...">
              <label>Número: </label>
              <input type="text" class="form-control cadastro" v-model="contato.numero" id="numero" placeholder="Digite o número do contato...">
              <input type="submit" class="btn btn-primary btnAdd" value="Salvar">
              <input type="text" class="btn btn-danger btnAdd" style="width: 70px;" value="Voltar" @click="permicaoCadastro = 2">
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  name: 'cadastroVenda',
  data: function () {
    return {
      order: {
        keys: 'name',
        sort: 'asc'
      },
      controleBotoes: 2,
      permicaoCadastro: 2,
      contato: {
        name: '',
        email: '',
        numero: ''
      },
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
      servicos: [
        {
          name: 'Marketing',
          price: 'R$ 2200,00',
          flag: 2
        },
        {
          name: 'Serviço de TI',
          price: 'R$ 2000,00',
          flag: 2
        },
        {
          name: 'Administração',
          price: 'R$ 1200,00',
          flag: 2
        },
        {
          name: 'Design',
          price: 'R$ 2200,00',
          flag: 2
        },
        {
          name: 'Desenvolvimento em Vue.js',
          price: 'R$ 4000,00',
          flag: 2
        },
        {
          name: 'Desenvolvimento em Vue.js com Vuex',
          price: 'R$ 6000,00',
          flag: 2
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
      dados: {
        inf: this.$store.state.contatoList,
        flag: this.$store.state.flag
      }
    }
  },
  methods: {
    verificaServicos: function (){
      let retorno = false
      for(let i=0;i<this.servicos.length;i++){
          if(this.servicos[i].flag == '1'){
            retorno = true;
          }
      }
      return retorno
    },
    save: function () {
      this.$store.dispatch('newContato', this.contato).then(() => {
        this.$store.dispatch('syncIndices')
        this.$router.push('/lista')
      })
    },
    pegaInformacao: function (indice) {
      this.$store.dispatch('getInformacao', indice)
    },
    tirarInformacao: function () {
      this.$store.dispatch('delInformacao')
    },
    sortBy: function (coluna) {
      this.order.keys = coluna
      this.order.sort = this.order.sort == 'desc' ? 'asc' : 'desc'
    },
    changeControleBotoes: function (data) {
      if (data == 2) {
        data = 1
        this.controleBotoes = data
      }else if (data == 1) {
        data = 2
        this.controleBotoes = data
      }
    },
    setTotal: function (data) {

    }
  },
  mounted: function() {
    // cria automaticamente caso esteja vazio para testes
    if(this.$store.state.contatoList.length == 0){
                
      this.$store.dispatch('newContato', {name: 'Vinícius',email: 'vinicius@ootz.com.br',numero: '42 9 9991-8821'}).then(()=>{
           this.$store.dispatch('syncIndices') 
      })
      this.$store.dispatch('newContato', {name: 'Klaus',email: 'klaus@ootz.com.br',numero: '41 9 9856-7546'}).then(()=>{
           this.$store.dispatch('syncIndices') 
      })
      this.$store.dispatch('newContato', {name: 'Sandra',email: 'sandra@ootz.com.br',numero: '42 9 9950-7220'}).then(()=>{
           this.$store.dispatch('syncIndices') 
      })
      this.$store.dispatch('newContato', {name: 'Joel',email: 'joel@ootz.com.br',numero: '42 9 9980-9749'}).then(()=>{
           this.$store.dispatch('syncIndices') 
      })
    }         
  },
  computed: {
    dadosFiltered () {
      let colecao = _.orderBy(this.dados.inf, this.order.keys, this.order.sort)
      return colecao
    },
    servicosFiltered () {
      let colecao = _.orderBy(this.servicos, this.order.key, this.order.sort)
      return colecao
    }
  }
}
</script>

<style>
.textLeft {
  text-align: left;
  padding: 0px 8px;
}
.allignRight {
  text-align: right;
}
.divBack1 {
  background-color: #fff;
  border-radius: 4px;
  margin: 5px;
  width: 300px;
}
.divBack2 {
  background-color: #fff;
  border-radius: 4px;
  margin: 5px;
  width: 800px;
}
.btnAdd {
  margin: 5px;
}
.cadastro {
  margin: 5px auto;
  width: 300px !important;
}
</style>
