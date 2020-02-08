
var db = require("../banco/dbconexao");

module.exports = {

    getDadosEmpresa(){
        return new Promise((resolve, reject) => {
            db.query(`Select * from empresa`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results[0]);
                    
                           }
            })
        })
    }
}