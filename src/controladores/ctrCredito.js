//const Credito = require('../modelos/mdlCredito');
var Util = require('../utilitarios/util');
const schema = require('../modelos/mdlCredito.json');
const Ajv = require('ajv');
const ajv = new Ajv();
var validate = ajv.compile(schema);

exports.estudiocredito = function (req, res) {
    let valid = validate(req.body);
    //Validacion de schema y retorno de error
    if (!valid) {
        var txt = validate.errors.map(e => e.dataPath + ' ' + e.message).join('');
        res.status(400).send(txt);
    } else {
        //Validacion de fecha
        if (validarfecha(req.body.FechaIngreso)) {
            //Calcular monto de prestamo
            var Rpta = estudiocredito(req);
            var Txt = Rpta > 0 ? "El valor aprobado para el prestamo es: "
                + Rpta : "El credito no fue aprobado";
            res.status(200).send(Txt);
        }
        else {
            res.status(400).send("Fecha de ingreso debe ser superior a fecha actual");
        }
    }
}

// Funcion para determinar el valor del prestamo
function estudiocredito(req) {
    var Salario = req.body.Salario;
    var prestamo = 0;
    prestamo = (Salario > 800000 && Salario <= 1000000) ? 5000000 :
        (Salario > 1000000 && Salario <= 4000000) ? 2000000 :
            (Salario > 4000000) ? 50000000 : 0;
    return prestamo;
}

// Funcion para validar la fecha de ingreso a laborar vs la fecha actual
function validarfecha(fecha) {
    var diff = Util.diffdays(fecha);
    return diff >= 1;
}