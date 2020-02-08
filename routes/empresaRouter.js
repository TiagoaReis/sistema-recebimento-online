var express = require('express');
var router = express.Router();
var cad_empresaModel = require('../model/cad_empresa/cad_empresaModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", function(req, res, next){
    cad_empresaModel.getTodos(function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Busca realizada com sucesso!';
        }else{
            resposta.dados = retorno;
            
        }    

        res.json(resposta);
        
    })
});


module.exports = router;