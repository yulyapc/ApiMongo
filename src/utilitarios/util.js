var fs = require('fs');


module.exports.createLog = (req, res) => {
    let now = new Date();
    var obj = { table: [] };

    //Se construye el nombre del archivo
    let nombre = "./logs/" + now.getFullYear() + "-" + (now.getMonth() + 1) + "-" + now.getDate() + "_log.json";

    //Se arma el json con la informacion a guardar
    var texto = construirdata(req, res);

    //Se valida si ya existe archivo del día
    validarexistente(nombre, (err, exists) => {
        if (err) {
            console.log('Hubo error' + err);
        }
        // Si existe archivo se lee el json existente y se adiciona la info nueva
        if (exists) {
            fs.readFile(nombre, 'utf8', function (err, data) {
                if (err) throw err;
                obj = JSON.parse(data);
                obj.table.push(texto);
                var json = JSON.stringify(obj);
                fs.writeFile(nombre, json, function (err) {
                    if (err) throw err;
                });
            });
        } else { //si no existe archivo se crea el json con la informacion
            obj.table.push(texto);
            fs.writeFile(nombre, JSON.stringify(obj), function (err) {
                if (err) throw err;
            });
        }
    });
}

// calcular la diferencia en dias entre dos fechas
module.exports.diffdays = (fec) => {
    var fecha = new Date(fec);
    var actual = new Date();
    return ((actual - fecha) / (1000 * 60 * 60 * 24));
}

// construccion de json con datos para log de auditoria
function construirdata(req, res) {
    var fecha = new Date();
    var data = ({
        idconsumidor: req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        hora: fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds(),
        fecha: fecha.getFullYear() + "-" + (fecha.getMonth() + 1) + "-" + fecha.getDate(),
        metodo: req.method,
        url: req.url,
        status: res.statusCode,
        statusMessage: res.statusMessage
    })
    return data;
}

//Valida si existe un archivo con el mismo nombre 
function validarexistente(file, data) {
    fs.stat(file, (err, stats) => {
        if (err) {
            if (err.code === 'ENOENT') {
                return data(null, false);
            } else { return data(err); }
        }
        return data(null, stats.isFile());
    });
}