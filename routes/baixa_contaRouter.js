var express = require('express');
var router = express.Router();
var baixa_contaModel = require('../model/baixa_conta/baixa_contaModel');
var RespostaClass = require('../model/RespostaClass');

router.get("/", function(req, res, next){
    baixa_contaModel.getContas(function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){
            resposta.erro = true;
            resposta.msg = 'Busca realizada com sucesso!';
        }else{
            //resposta.dados = retorno;
            resposta = retorno;
            
        }    
        //console.log(retorno)
        res.json(resposta);
        
    })
});

router.post("/?", function(req, res, next){
    baixa_contaModel.adicionar(req.body,function(erro, retorno){
        let resposta = new RespostaClass();
        if (erro){            
            resposta.erro = true;
            resposta.msg = 'Busca realizada com sucesso!';
        }else{
            if(retorno.affectedRows > 0){
                resposta.msg = "Conta registrada com sucesso.";
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