const mysql = require('mysql');

const conexao = mysql.createPool({
    host: 'localhost', 
    user: 'root', 
    password: '030709', 
    database: 'recebime'
});

module.exports = conexao;