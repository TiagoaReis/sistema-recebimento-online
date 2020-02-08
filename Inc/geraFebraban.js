var contas_recebidas = require("../model/contas_recebidas");
var usuario = require("../model/usuarios");
module.exports = {
    render(req, res, error) {
        // res.render('admin/recebimento', usuario.getParams(req, {
        //     data,
        //     body: req.body
    contas_recebidas.getValorTotalContasRecebidas().then(data => {       
        res.render('admin/gera_febraban', usuario.getParams(req, {
            data, 
            error
        }));
    });
    
    }
};