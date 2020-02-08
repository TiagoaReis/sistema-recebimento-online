var express = require('express');
var router = express.Router();
var cad_caixaModel = require('../model/cad_caixa/cad_caixaModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", function(req, res, next){
    cad_caixaModel.getTodos(function(erro, retorno){
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