<template>
  <div class="row">
    <div class="container">
      <h1>Cadastro de vendas</h1>
      <!-- Dados selecionados -->
      <div class="col-md-4 divBack1">
        <div class="row">
          <h3 class="textLeft">Serviços selecionados</h3>
          <p v-if="verificaServicos()" class="textLeft"><b>Nome:</b></p>
          <div v-for="servico in servicos" v-if="servico.flag == 1">
            <li class="textLeft">{{ servico.name }}</li>
          </div>
          <p v-if="verificaServicos()" class="textLeft"><b>Preço:</b></p>
          <div v-for="(servico, k) in servicos" v-if="servico.flag == 1">
            <li class="textLeft">R$ {{ servico.price }},00</li>
          </div>
          <p class="textLeft"><b>Total:</b></p>
          <li class="textLeft">R$ {{ this.$store.state.total }},00</li>
        </div>
        <div class="row">
          <h3 class="textLeft">Cliente selecionado</h3>
          <p class="textLeft">
            {{ this.$store.state.clienteSelecionado.name }}
            <button class="btn btn-danger glyphicon glyphicon-remove" v-if="controleBotoes == 1" @click="tirarInformacao(), changeControleBotoes(controleBotoes)"></button>
          </p>
        </div>
        <div class="row" style="border-top: 1px solid #000;">
          <button class="btn btn-success btnAdd" @click="finalizarCompra()">Finalizar</button>
        </div>
      </div>
      <!-- Dados disponíveis -->
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
                <tr v-for="(servico,k) in servicos" class="textLeft">
                  <td>{{ servico.name }}</td>
                  <td>R$ {{ servico.price }},00</td>
                  <td>
                    <button class="btn btn-primary glyphicon glyphicon-plus" v-if="servico.flag == 2" @click="servico.flag = 1, getTotal(servico), pegarServico(servico), count++"></button>
                    <button class="btn btn-danger glyphicon glyphicon-remove" v-if="servico.flag == 1" @click="servico.flag = 2, delTotal(servico), pegarServico(servico), count--"></button>
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
          <button id="cadastroCliente" class="btn btn-primary btnAdd" v-on:click="permicaoCadastro = 1, addCliente()"><span class="glyphicon glyphicon-plus"></span>Adicionar cliente</button>
          <div v-show="permicaoCadastro == 1" >
            <form id="form_id" @submit.prevent="save">
              <label>Nome: </label>
              <input type="text" class="form-control cadastro" id="name" placeholder="Digite o nome do contato...">
              <label>Email: </label>
              <input type="email" class="form-control cadastro" id="email" placeholder="Digite o email do contato...">
              <label>Número: </label>
              <input type="text" class="form-control cadastro" id="numero" placeholder="Digite o número do contato...">
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
      count: 0,
      permicaoCadastro: 2,
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
            retorno = true
        }
      }
      return retorno
    },
    addCliente: function(){
      $("document,body").animate({
          scrollTop: $("#cadastroCliente").offset().top
      }, 500)
      setTimeout(function(){
        $('#name').focus()        
      }, 100)
    },
    save: function () {
      let informacao = {
        name: $('#name').val(),
        email: $('#email').val(),
        numero: $('#numero').val()
      }
      this.$store.dispatch('newContato', informacao)
      .then(() => {
        this.$store.dispatch('syncIndices')
      })
      .then(() => {
        this.$store.dispatch('getInformacao', informacao.id)
        $('#name').val('')
        $('#email').val('')
        $('#numero').val('')
      })
      .then(() => {
        this.permicaoCadastro = 2
        this.controleBotoes = 1    
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
    getTotal: function (data) {
      this.$store.dispatch('getTotalAct', data)
    },
    delTotal: function (data) {
      this.$store.dispatch('delTotalAct', data)
    },
    pegarServico: function (data) {
      if (data.flag == 1) {
        this.$store.dispatch('getServico', data)
      } else if (data.flag == 2) {
        this.$store.dispatch('delServico', data)
      }
    },
    finalizarCompra: function () {
      let venda = {
        clienteSelecionado: this.$store.state.clienteSelecionado,
        servicos: this.$store.state.servicos,
        qtdServicos: this.count,
        total: this.$store.state.total
      }
      this.$store.dispatch('getFinalizar', venda).then(() => {
        this.$router.push('/lista-venda')
      })
    }
  },
  mounted: function() {
    if(this.$store.state.total != 0){
      this.$store.state.total = 0
    }
    if(this.$store.state.clienteSelecionado != ''){
      this.$store.state.clienteSelecionado = ''
    }
    if (this.$store.state.servicos.length > 0) {
      this.$store.state.servicos = []
    }
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
    }
  }
}
</script>

<style>
.allignRight {
  text-align: right;
}
.btnAdd {
  margin: 5px;
}
.cadastro {
  margin: 5px auto;
  width: 300px !important;
}
</style>
