var usuario = require("../model/usuarios");

var db = require("../banco/dbconexao");

module.exports = {
    
    render(req, res, error) {        
        this.getDadosEmpresaConveniada().then(data => {
            res.render('admin/empresa_conveniada', usuario.getParams(req, {
               data,
               error
            }));            
        });
    },
    getDadosEmpresaConveniada(){
        return new Promise((resolve, reject) => {
            db.query(`Select * from empresa_conveniada`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results[0]);                    
                    
                           }
            })
        })
    },
    // save(nome_empresa, logradouro, num_imovel, compl_imovel, bairro, cidade, fone, ramal_contacto){
        
    //     return new Promise((resolve, reject) => {
    //         db.query(`INSERT INTO empresa_conveniada (nome_empresa, logradouro, num_imovel, compl_imovel, bairro, cidade, fone, ramal_contacto)
    //                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
    //                     nome_empresa, 
    //                     logradouro, 
    //                     num_imovel, 
    //                     compl_imovel, 
    //                     bairro, 
    //                     cidade, 
    //                     fone, 
    //                     ramal_contacto                        
                         
    //                 ], (err, results)=>{
    //                     if (err) { reject(err); }
    //                     else { 
    //                         resolve(results);
                            
    //                        }
    //         });
    //     });
    // } 
    save(fields, files){
        
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO empresa_conveniada (nome_empresa, logradouro, num_imovel, compl_imovel, bairro, cidade, fone, ramal_contacto)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
                        fields.nome_empresa, 
                        fields.logradouro, 
                        fields.num_imovel, 
                        fields.compl_imovel, 
                        fields.bairro, 
                        fields.cidade, 
                        fields.fone, 
                        fields.ramal_contacto                        
                         
                    ], (err, results)=>{
                        if (err) { reject(err); }
                        else { 
                            resolve(results);
                            
                           }
            });
        });
    } 
}