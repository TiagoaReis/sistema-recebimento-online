const db = require('../../banco/dbconexao');

module.exports =  class baixa_contaModel{
    static getContas(callback) {
        return db.query("Select * from baixa_conta ", callback)
     }
    static adicionar(conta, callback) {
        return db.query ("Insert into baixa_conta (cod_barra, cod_empresa_conveniada,grupo,dv_baixa_conta, valor_conta, dt_pagto, hora_pagto, cod_agencia, cod_empresa, sequencia_baixa, valor_cheque,obs_cheque, recebido_por_codbarra, situacao, BaixaContaID, DataExclusao, Motivo) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[conta.cod_barra, conta.cod_empresa_conveniada,conta.grupo,conta.dv_baixa_conta, conta.valor_conta, conta.dt_pagto, conta.hora_pagto, conta.cod_agencia, conta.cod_empresa, conta.sequencia_baixa, conta.valor_cheque,conta.obs_cheque, conta.recebido_por_codbarra, conta.situacao, conta.BaixaContaID, conta.DataExclusao, conta.Motivo],  callback);
     }
}