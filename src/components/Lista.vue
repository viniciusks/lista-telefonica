<template>
  <div class="container">
    <h1>Lista de contatos</h1>
    <table class="table table-striped">
            <thead>
                <th v-for="coluna in colunas">
                    <a>{{ coluna }}</a>
                </th>
            </thead>
            <tbody>
                <tr>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                </tr>
            </tbody>
        </table>
  </div>
</template>

<script>
export default {
  name: 'lista',
  data: function () {
    return {
      colunas: [
        'Id: ',
        'Nome: ',
        'Email: ',
        'Número: '
      ]
    }
  }
}
</script>
