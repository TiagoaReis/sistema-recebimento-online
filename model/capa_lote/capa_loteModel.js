const db = require('../../banco/dbconexao');

module.exports =  class Cad_empresaModel{
    static getTodos(callback) {
       return db.query("Select * from capa_lote order by dt_pagto desc", callback)
    }
}