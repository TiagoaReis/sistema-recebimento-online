var db = require("../banco/dbconexao");
class EstornoController {

    constructor(){

         this._dataAtualEL = document.querySelector("#dataAtual");
         //this._horaAtualEL = document.querySelector("#horaAtual");
        // this._dataAtual = "00/00/99";
        // this._horaAtual = "22:20";
         this.initialize();
    }

    initialize(){
       
        console.log("Teste 123");
       
        this._dataAtualEL.innerHTML = "Data: " + dataAtualFormatada();
        //this._horaAtualEL.innerHTML = "05:20";
    }

    get dataAtual(){
        return new Date();
    }
    set dataAtual(valor){
        this._dataAtual = valor;
    }
    get horaAtual(){
        return this._horaAtual;        
    }
    set horaAtual(valor){
        this._horaAtual = valor;
    }

    
    
}
function dataAtualFormatada(){
    var data = new Date(),
        dia  = data.getDate().toString().padStart(2, '0'),
        mes  = (data.getMonth()+1).toString().padStart(2, '0'), //+1 pois no getMonth Janeiro começa com zero.
        ano  = data.getFullYear();
    return dia+"/"+mes+"/"+ano;}




module.exports = {

    getContasEstornadas(){
        return new Promise((resolve, reject) => {
            db.query(`Select * from baixa_conta where situacao <> '0' order by dt_pagto desc`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           }
            })
        })
    }
}