const db = require('../../banco/dbconexao');

module.exports =  class Cad_empresaModel{
    static getTodos(callback) {
       return db.query("Select * from empresa", callback)
    }
}