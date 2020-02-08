
var db = require("../banco/dbconexao");

module.exports = {

    dastboard(){
        return new Promise((resolve, reject) => {
            db.query(`Select (Select count(*) from baixa_conta where month(dt_pagto) = month(CURDATE())) as totalrecebidas ,
                            (Select Sum(valor_conta) from baixa_conta where month(dt_pagto) = month(CURDATE()) ) as total_recebidas ,
                            (Select count(*)  from baixa_conta where month(dt_pagto) = month(CURDATE()) and situacao = '2' )  as totalestornadas,
                            (select  day(dt_pagto) from capa_lote order by dt_pagto desc LIMIT 1) as dia, (select  month(dt_pagto) from capa_lote order by dt_pagto desc LIMIT 1) as mes ,
                            (select  year(dt_pagto) from capa_lote order by dt_pagto desc LIMIT 1) as ano,
                            (CASE when valor_conta > 0 then SUM(valor_conta) else 0 end) AS total_dia FROM recebime.baixa_conta where dt_pagto = CURDATE() `, 
                             
                             (err, results)=>{

                if (err) { reject(err); }
                else { 
                    resolve(results[0]);
                    
                           }
            })
        })
    }
} //baixa_conta where dt_pagto >= curdate() order by dt_pagto desc(Select count(*) from baixa_conta where month(dt_pagto) = month(current_timestamp) and situacao = '0') as totalrecebidas ,