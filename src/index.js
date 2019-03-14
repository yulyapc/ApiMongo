const express = require('express');
const bodyParser = require('body-parser');
var app = express();
const cliente = require('./rutas/rtaCliente'); 
const mongoose = require('mongoose');

//Conexion a base de datos
let dburl = 'mongodb://localhost/ClientesBanco';
mongoose.connect(dburl);
mongoose.Promise = global.Promise;
let conexion = mongoose.connection;
conexion.on('error', console.error.bind(console, 'Error de conexion mongo:'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/', cliente);

app.listen(4000, function () {
    console.log('Api corriendo en puerto 4000');
  });