const db = require('../../banco/dbconexao');

module.exports =  class Cad_empresaModel{
    static getTodos(callback) {
       return db.query("Select * from caixa order by dt_abre_caixa desc", callback)
    }
}