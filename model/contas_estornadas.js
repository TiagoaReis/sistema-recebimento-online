
var db = require("../banco/dbconexao");

module.exports = {

    getContasEstornadas(){
        return new Promise((resolve, reject) => {
            db.query(`Select * from baixa_conta where dt_pagto = curdate() and situacao <> '0' order by dt_pagto desc`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           }
            })
        })
    },
    getValorTotalContasEstornadas(){
        return new Promise((resolve, reject) => {
            db.query(`Select Sum(valor_conta) as total_estornadas from baixa_conta where dt_pagto = curdate() and situacao <> '0'`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results[0]);
                    
                           }
            })
        })
    }
}
