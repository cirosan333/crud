var express = require('express');
var router = express.Router();
var usersModel = require('./../../models/usersModel');
const { getUserAndPassword } = require('./../../models/usersModel');

/*obtiene la pagina de admin */
router.get('/', function(req, res, next) {
  res.render('admin/login', {
      layout:'admin/layout'
  });
});

router.get('/logout', function(req, res, next) {
    req.session.destroy(); //destruye la sesion
    res.render('admin/login', {
        layout:'admin/layout'
    });
  });

router.post('/', async (req, res, next) => {
    try {
        var user = req.body.user;
        var password = req.body.password;

        console.log(req.body);

        var data = await usersModel.getUserAndPassword(user, password);

        if(data != undefined){
            req.session.id_usuario = data.id;
            req.session.nombre = data.usuario;

            res.redirect('/admin/novedades');
        } else {
            res.render('admin/login',{
                layout: 'admin/layout',
                error : true
            })
        }
    }
    finally {}
});

module.exports = router;
