<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <h1 class="title">Lista telefônica do Kremoso</h1>
      </div>
      <div class="row">
        <a href="#/" class="btn btn-default">Home</a>
        <a href="#/cadastro" class="btn btn-default">Cadastro</a>
        <a href="#/lista" class="btn btn-default">Lista</a>
        <a href="#/cadastro-venda" class="btn btn-default">Cadastro de vendas</a>
        <a href="#/lista-venda" class="btn btn-default">Lista de vendas</a>
      </div>
      <div class="row">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  style: [
    require('bootstrap/dist/css/bootstrap.min.css')
  ],
  script: [
    require('jquery/dist/jquery.min.js')
  ]
}
</script>

<style>
body {
  background-color: #d9534f;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.title {
  color: #35495e;
}
.title:hover{
  color: #41b883;
}
</style>
