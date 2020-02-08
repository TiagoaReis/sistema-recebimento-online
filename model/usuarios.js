var db = require("../banco/dbconexao");

module.exports = {

    // render(req, res, error ){
    //     res.render("admin/login", { body: req.body, error});
    // },
    render(req, res, error) {        
        this.getUsuarios().then(data => {
            res.render('admin/login', this.getParams(req, {
               data,
               error
            }));            
        });
    },
    validaNovoUsuario(req, res, error ){
        res.render("admin/users", { body: req.body, error});
    },
    logout(email, senha ){
        console.log("passo1");
        return new Promise((resolve, reject) => {
            db.query(`Select * from usuarios where email = ?`, [ email ], (err, results)=>{
                if (err) { reject(err); }
                else { 
                    if (!results.length > 0){
                        reject("erro 2.")
                    }else{

                        let row = results[0];

                        if (row.senha !== senha){
                            reject("erro 3.")
                        }else {
                            if (row.logado === 'S'){
                                console.log("passo - logado");
                                this.UsuarioOffline(email, senha);
                                console.log("teste");
                                resolve(row)    
                            }else {
                                reject("usuario offline.")
                            }
                        }

                    }
                           }
            })
        })
        
    },

    login(email, senha){
        return new Promise((resolve, reject) => {
            db.query(`Select * from usuarios where email = ?`, [ email ], (err, results)=>{
                if (err) { reject(err); }
                else { 
                    if (!results.length > 0){
                        reject("Usuário ou senha incorretos.")
                    }else{

                        let row = results[0];

                        if (row.senha !== senha){
                            reject("Usuário ou senha incorretos.")
                        }else {
                            if (row.logado !== 'S'){
                                this.UsuarioOnline(row.id,email,senha);
                                console.log("teste");
                                resolve(row)    
                            }else {
                                reject("Atenção! Este usuário já esta online.")
                            }
                        }

                    }
                           }
            })
        })
    },

    getParams(req, params) {
        return Object.assign({}, {
            usuario: req.session.user}, params)
    }
    , 
    getUsuarios(){
        return new Promise((resolve, reject) => {
            db.query(`Select * from usuarios`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           }
            })
        })
    },
    
    UsuarioOnline(id,email,senha){
        return new Promise((resolve, reject) => {
            db.query(`update usuarios set logado = 'S' where id = ? and email = ? and senha =? `,[id,email,senha], (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           }
            })
        })
    },
    
    UsuarioOffline(email,senha){
        return new Promise((resolve, reject) => {
            db.query(`update usuarios set logado = 'N' where email = ? and senha =? `,[email,senha], (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results);
                    
                           }
            })
        })
    },

    getMaxUsuarios(){
        return new Promise((resolve, reject) => {
            db.query(`SELECT max(id) as num_users FROM usuarios`, (err, results)=>{
                if (err) { reject(err); }
                else { 
                    resolve(results[0]);
                    
                           }
            })
        })
    },

    save(name, email, password){
        
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO usuarios (nome, email, senha, logado)
                    VALUES (?, ?, ?, ?)`, [
                        name,
                        email,
                        password,                        
                        'N'
                         
                    ], (err, results)=>{
                        if (err) { reject(err); }
                        else { 
                            resolve(results);
                            
                           }
            });
        });
    }
    
}