var contas_recebidas = require("../model/contas_recebidas");
var usuario = require("../model/usuarios");
module.exports = {
    render(req, res, error) {        
        users.getUsuarios().then(data => {
            res.render('admin/users', usuario.getParams(req, {
               data
            }));
        });
    }
    
};