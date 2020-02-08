var express = require("express");
var usuario = require("../model/usuarios");
//var recebimento = require("../public/admin/controllers/recebimento");
var paineladmin = require("../model/paineladmin");
var dadosempresa = require("../model/orgao_arrecadador");
var empresa_conveniada = require("../model/empresa_conveniada");
var contas_recebidas = require("../model/contas_recebidas");
var contas_estonadas = require("../model/contas_estornadas");
var gera_Febraban = require("./../model/gera_febraban");
var recebimento = require("./../Inc/recebimento");
var geraArquivo = require("./../Inc/geraFebraban");
var users = require("../model/usuarios");
var router = express.Router();


//middleware
router.use(function(req, res, next){
  if(['/login'].indexOf(req.url) === -1 && !req.session.user){
      res.redirect("login");
  } else {
      next();
  }
  //console.log();
})

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('admin/login', { title: 'Projeto express' });
  usuario.render(req, res, null);
});

router.get('/logout', function(req, res, next) {
  usuario.logout(req.session.user.email, req.session.user.senha);
  delete req.session.user;
  console.log("Passo fim antes login");
  res.redirect("login");
});

router.post('/login', function(req, res, next) {
    //res.render('admin/login', { title: 'Projeto express' });
    if (!req.body.email) {
        usuario.render(req, res, "Preencha o campo e-mail" );
    }  else if (!req.body.senha) {
        usuario.render(req, res, "Preencha o campo senha" );
    }  else {
            usuario.login(req.body.email, req.body.senha).then(user =>{
                req.session.user = user ;
                console.log();
                res.redirect("index");
            }).catch(err => {
              usuario.render(req, res, err.message || err);
            });
        }

});

router.post('/index', function(req, res, next) {
  //res.render('admin/login', { title: 'Projeto express' });
  // if (!req.body.email) {
  //     usuario.render(req, res, "Preencha o campo e-mail" );
  // }  else if (!req.body.senha) {
  //     usuario.render(req, res, "Preencha o campo senha" );
  // }  else {
  //         usuario.login(req.body.email, req.body.senha).then(user =>{
  //             req.session.user = user ;
  //             console.log();
  //             res.redirect("index");
  //         }).catch(err => {
  //           usuario.render(req, res, err.message || err);
  //         });
  //     }
    usuario.logout(req.body.email, req.body.senha).then(user =>{
      req.session.user = user ;
      console.log("passo1");
      res.redirect("admin/index");
  }).catch(err => {
    usuario.render(req, res, err.message || err);
  });

});


router.get('/login', function(req, res, next) {
    //res.render('admin/login', { title: 'Projeto express' });
    users.render(req, res, null);
  });

router.get('/contacts', function(req, res, next) {
  //if (!req.session.views) req.session.views = 0;
  //console.log('Session:' + req.session.views++);
  res.render('admin/contacts', {  usuario: req.session.user });

});

router.get('/index', function(req, res, next) {
  paineladmin.dastboard().then(data => {
    res.render('admin/index', usuario.getParams(req, { data }))
});
});
// dadosempresa.dadosEmpresa().then(dadosEmp => {
//   res.render('admin/index', usuario.getParams(req, { dadosEmp }))
// });
// });

// router.get('/print', function(req, res, next) {
//   res.render('admin/print', {  usuario: req.session.user });
// });

router.get('/print', function(req, res, next) {
  contas_recebidas.getContasRecebidas().then(data => {
    res.render('admin/print', usuario.getParams(req, {
       data
    }));
  });
});

router.get('/menus', function(req, res, next) {
    res.render('admin/menus', {  usuario: req.session.user });
  });

router.get('/emails', function(req, res, next) {
    res.render('admin/emails', {  usuario: req.session.user });
  });

router.get('/list_contas_recebidas', function(req, res, next) {
  paineladmin.dastboard().then(data => {
      res.render('admin/list_contas_recebidas', usuario.getParams(req, {
        date,
        data
      })).catch(err => {
        console.error(err);
      });
  });
});

router.get('/contas_recebidas', function(req, res, next) {
  contas_recebidas.getContasRecebidas().then(data => {
    res.render('admin/contas_recebidas', usuario.getParams(req, {
       data
    }));
  });
});

router.get('/contas_estornadas', function(req, res, next) {
  contas_estonadas.getContasEstornadas().then(data => {
    res.render('admin/contas_estornadas', usuario.getParams(req, {
       data
    }));
  });
});

// router.get('/users', function(req, res, next) {
//     res.render('admin/users', {  usuario: req.session.user, date: {}});
//   });

router.get('/users', function(req, res, next) {
  users.getUsuarios().then(data => {
    res.render('admin/users', usuario.getParams(req, {
       data
    }));
  });
  //users.render (req, res);
});
router.post('/users', function(req, res, next) {
  if (!req.body.name) {
    users.render(req, res, "Preencha todos os campos para cadastrar novo usuário!" );
  } else if (!req.body.email) {
    users.render(req, res, "Preencha todos os campos para cadastrar novo usuário!" );
  } else if (!req.body.password) {
    users.render(req, res, "Preencha todos os campos para cadastrar novo usuário!" );
  }else{
    usuario.save(req.body.name, req.body.email, req.body.password).then(data =>{    
      users.getUsuarios().then(data => {
        res.render('admin/users', usuario.getParams(req, {
          data
        }));
      });
      //alert("Usuário cadastrado com sucesso.");
    }).catch(err=>{
      res.send(err);
      console.log("Erro ao inserir novo usuario");
    });
  }
});

router.get('/orgao_arrecadador', function(req, res, next) {
  dadosempresa.getDadosEmpresa().then(data => {
    res.render('admin/orgao_arrecadador', usuario.getParams(req, {
       data
    }));
  });
});

router.get('/empresa_conveniada', function(req, res, next) {
  empresa_conveniada.getDadosEmpresaConveniada().then(data => {
    res.render('admin/empresa_conveniada', usuario.getParams(req, {
       data
    }));
  });
});
router.post('/empresa_conveniada', function(req, res, next) {
  // if (!req.body.nome_empresa) {
  //   empresa_conveniada.render(req, res, "Preencha todos os campos para efetuar o cadastro da empresa convêniada!" );  
  // }else{
  //   empresa_conveniada.save(req.body.nome_empresa, req.body.logradouro, req.body.num_imovel, req.body.compl_imovel, req.body.bairro, req.body.cidade, req.body.fone, req.body.ramal_contacto ).then(data =>{    
  //     empresa_conveniada.getDadosEmpresaConveniada().then(data => {
  //       res.render('admin/empresa_conveniada', usuario.getParams(req, {
  //         data
  //       }));
  //     });
  //     //alert("Usuário cadastrado com sucesso.");
  //   }).catch(err=>{
  //     res.send(err);
  //     console.log("Erro ao inserir novo usuario");
  //   });
  // }
    req.send(req.fields);
    // empresa_conveniada.save(req.fields, req.files).then(data =>{    
    //   empresa_conveniada.getDadosEmpresaConveniada().then(data => {
    //     res.render('admin/empresa_conveniada', usuario.getParams(req, {
    //       data
    //     }));
    //   });
    //   //alert("Usuário cadastrado com sucesso.");
    // }).catch(err=>{
    //   res.send(err);
    //   console.log("Erro ao inserir novo usuario");
    // });
 
});

router.get('/recebimento', function(req, res, next) {
  //contas_recebidas.getValorTotalContasRecebidas().then(data => {
    //recebimento.render (req, res);
    //res.render('admin/recebimento', usuario.getParams(req, {
    //   data
    //}));
  //});
  
  recebimento.render (req, res);
});
router.get('/estorno', function(req, res, next) {
  contas_estonadas.getValorTotalContasEstornadas().then(data => {
    res.render('admin/estorno', usuario.getParams(req, {
       data
    }));
  });
});

router.post('/recebimento', function(req, res, next) {  
  if (!req.body.cod_barras) {
    recebimento.render(req, res, "Preencha o código de barras" );
  } else if (!req.body.valor_conta) {
    recebimento.render(req, res, "Preencha o valor da conta" );
  } else  {
    res.send(req.body);
  }
    
});

router.get('/gera_febraban', function(req, res, next) {
  geraArquivo.render (req, res);  
  // res.render('admin/list_arquivos_gerados', usuario.getParams(req, {
  //     data
  // }));
  
});

router.get('/list_arquivos_gerados', function(req, res, next) {
  //geraArquivo.render (req, res);
  gera_Febraban.getCapaLote().then(data => {
    res.render('admin/list_arquivos_gerados', usuario.getParams(req, {
       data
    }));
  });
});

module.exports = router;
