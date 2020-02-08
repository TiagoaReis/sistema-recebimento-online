const db = require('../../banco/dbconexao');

module.exports =  class Cad_produtoModel{
    static getProdutos(callback) {
        return db.query("Select * from produto ", callback)
     }
    static adicionar(produto, callback) {
        return db.query("Insert into produto (nome, sigla) values(?,?)",[produto.nome, produto.sigla],  callback);
     }
}