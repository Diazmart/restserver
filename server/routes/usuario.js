
const express = require('express');
const bcrypt = require('bcrypt');
const _ =require('underscore');
const Usuario = require('../models/usuario');
const app = express();

/*app.get('/usuario', function (req, res) {

  let iniciaren = req.query.iniciaren || 0;
  iniciaren = Number(iniciaren);

  let limite = req.query.limite || 5;
  limite = Number(limite);
   
   Usuario.find({}, 'nombre email')
          .skip(iniciaren)
          .limit(limite)
          .exec((err, usuarios)=>{
            
            if(err){
              return res.status(400).json({
                ok: false,
                err
                });
            }

            res.json({
              ok: true,
              usuarios: usuarios
            })
          });
}); */


//Mi forma de tratar más de un parámetro recibido
  app.get('/usuario', function (req, res) {

  let parametrosConsulta = req.query; 
 
  let nombre = parametrosConsulta.nombre;
  let email = parametrosConsulta.email;

  console.log("recibimos el nombre:" + nombre);
  console.log("recibimos el email:" +   email);

  Usuario.find({nombre,email}, 'nombre email').exec((err, usuarios)=>{
            
           if(err){
              return res.status(400).json({
                ok: false,
                err
                });
            }

            res.json({
              ok: true,
              usuarios: usuarios
            })
          });
}); 

/*app.get('/usuario/:nombre', function (req, res) {

   let nombre= req.params.nombre; 
   console.log("recibimos el nombre:" + nombre);
   Usuario.find({nombre}, 'nombre email').exec((err, usuarios)=>{
            
            if(err){
              return res.status(400).json({
                ok: false,
                err
                });
            }

            res.json({
              ok: true,
              usuarios: usuarios
            })
          });
});*/

app.post('/usuario', function (req, res) {
  let body = req.body;

  //Aquí se crea la instancia usuario del esquema Ususario
  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    role: body.role,
    //password: body.password,
    password: bcrypt.hashSync(body.password, 10)
    }); //y así se crea el objeto usuario.

  //o llega un error o se guarda un usuario :)
  usuario.save( (err, usuarioDB) =>{

    if(err){
       return res.status(400).json({
        ok: false,
        err
       });
    }

    res.json({
      ok: true,
      usuario: usuarioDB
    });

  });
  
});


app.put('/usuario/:id', function (req, res) {
  //res.send('Hello World')
  let id= req.params.id;
  let body = _.pick(req.body,['nombre','email','img','role','estado']);

  Usuario.findByIdAndUpdate(id, body, {new:true }, (err, usuarioDB) =>{

      if(err){
       return res.status(400).json({
        ok: false,
        err
       });
      }

     res.json({
        ok: true,
        usuario: usuarioDB
      });

  });
}); //Termina put

app.delete('/usuario/:id', function (req, res) {
 
  let id = req.params.id;
  Usuario.findByIdAndRemove(id, (err, idBorrado)=>{

      if(err){
       return res.status(400).json({
        ok: false,
        err
       });
      };
      
      if (!idBorrado){
        return res.status(400).json({
        ok: false,
        err: {
          message: 'Usuario no encontrado'
        }
       });
      }

      res.json({
          ok: true,
          usuario: idBorrado
      }); 

  });

});

module.exports = app;
