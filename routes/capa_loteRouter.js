var express = require('express');
var router = express.Router();
var capa_loteModel = require('../model/capa_lote/capa_loteModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", function(req, res, next){
    capa_loteModel.getTodos(function(erro, retorno){
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