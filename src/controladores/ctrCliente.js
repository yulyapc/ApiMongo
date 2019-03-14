const Cliente = require('../modelos/mdlCliente');
var Log = require('../utilitarios/util');


// crea el cliente realizando validacion si existe o no la identificación
exports.crear = function (req, res) {
    Cliente.find({ identificacion: req.body.identificacion }, function (err, rpta) {
        if (err) res.status(500).send('Error: ' + err)
        else {
            if (rpta.length > 0) {
                res.status(200).send('El cliente ya existe');
            } else {
                let client = new Cliente(
                    {
                        identificacion: req.body.identificacion,
                        nombre: req.body.nombre,
                        apellido: req.body.apellido,
                        fechanacimiento: req.body.fechanacimiento,
                    }
                );
                client.save(function (err) {
                    if (err) {
                        res.status(400).send('Error: ' + err)
                    } else {
                        res.status(200).send('Creacion OK')
                    }                    
                })
            }
        }
        Log.createLog(req, res);
    })
};

//Busca cliente por id
exports.buscar_id = function (req, res) {
    Cliente.findById(req.params.id, function (err, rpta) {
        if (err) res.status(500).send('Error: ' + err);
        res.status(200).send(rpta);
        Log.createLog(req, res);
    })
};

//busca cliente por identificacion
exports.buscar_identificacion = function (req, res) {
    Cliente.find({ identificacion: req.params.identificacion }, function (err, rpta) {
        if (err) res.send('Error: ' + err);
        res.status(200).send(rpta);
        Log.createLog(req, res);
    })
};

//Buscar todos los clientes
exports.buscartodos = function (req, res) {
    Cliente.find(function (err, clientes) {
        if (err) res.send('Error: ' + err);
        res.status(200).send(clientes);
        Log.createLog(req, res);
    })
};

//Actualizar clientes
exports.actualizar = function (req, res) {
    Cliente.findByIdAndUpdate(req.params.id, { $set: req.body }, function (err, clientes) {
        if (err) res.send('Error: ' + err);
        res.status(200).send('cliente actualizado.');
        Log.createLog(req, res);
    });
};

//eliminar clientes
exports.eliminar = function (req, res) {
    Cliente.findByIdAndRemove(req.params.id, function (err) {
        if (err) res.send('Error: ' + err);
        res.status(200).send('Eliminacion correcta!');
        Log.createLog(req, res);
    })
};

