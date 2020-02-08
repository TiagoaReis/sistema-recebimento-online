
var db = require("../banco/dbconexao");

module.exports = {
    // db.query(`Select * from baixa_conta order by dt_pagto desc`, (err, results)=>{
    getContasRecebidas(){
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM baixa_conta where dt_pagto >= curdate() order by dt_pagto desc`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           } 
            })
        })
    },
    getValorTotalContasRecebidas(){
        return new Promise((resolve, reject) => {
            db.query(`Select Sum(valor_conta) as total_contas from baixa_conta where dt_pagto >= curdate()`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results[0]);
                    
                           }
            })
        })
    }
}