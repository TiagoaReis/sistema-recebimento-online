var contas_recebidas = require("../model/contas_recebidas");
var usuario = require("../model/usuarios");
module.exports = {
    render(req, res, error) {        
        contas_recebidas.getValorTotalContasRecebidas().then(data => {        
            res.render('admin/recebimento', usuario.getParams(req, {
            data, 
            error
            }));
        });    
    }
    
};