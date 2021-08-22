//dependencias
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer')
var novedadesModel = require('../models/novedadesModel');

/* GET home page. */
router.get('/', async function(req, res, next) {
  var novedades = await novedadesModel.getNovedades();
  res.render('index',{
    novedades
  });
});

router.post('/', async (req, res, next) => {

  var codigo_area = req.body.codigo_area;
  var ciudad = req.body.ciudad;
  var direccion = req.body.direccion;
  var email = req.body.email;
  var telefono = req.body.tel;
  console.log(req.body);

  var obj = {
    to: 'cirosantiago6@gmail.com',
    subject: 'Contacto desde la web',
    html: email + " Quiere mas informacion sobre tus cervezas <br>" + "Telefono:" + telefono + 
    ". <br> Ciudad:" + ciudad + ". <br>" + codigo_area + ". <br> Direccion:" + direccion
  }
 
  var transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: process.env.SMTP_PORT,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS
     }
  })

var info = await transporter.sendMail(obj);

res.render('index', {
  message: 'Mensaje enviado correctamente',
})

});//cierra peticion post



module.exports = router;
