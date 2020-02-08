
var db = require("../banco/dbconexao");

module.exports = {
    // db.query(`Select * from baixa_conta order by dt_pagto desc`, (err, results)=>{
    getCapaLote(){
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM capa_lote order by dt_pagto desc`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           } 
            })
        })
    },    
}