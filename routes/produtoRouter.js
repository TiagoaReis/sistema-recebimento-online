var express = require('express');
var router = express.Router();
var cad_produtoModel = require('../model/cad_produto/cad_produtoModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", function(req, res, next){
    cad_produtoModel.getProdutos(function(erro, retorno){
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

router.post("/?", function(req, res, next){
    cad_produtoModel.adicionar(req.body,function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Busca realizada com sucesso!';
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Cadastro realizado com sucesso.";
            }else{
                resposta.erro = true;
                resposta.msg = "Não foi possível realizar esta operação ";
            }
            
        }    
        console.log('erro',erro)
        res.json(resposta);
        
    })
});

module.exports = router;