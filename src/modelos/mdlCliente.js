const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var Util = require('../utilitarios/util');

let ClienteSchema = new Schema({
    identificacion: { type: Number, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    fechanacimiento: {
        type: Date, required: true, validate: [
            function (fechanacimiento) {
                var edad = (Util.diffdays(fechanacimiento)) / 365;
                return 18 < edad;
            },
            'Debe ser mayor de edad']

    }
});



module.exports = mongoose.model('cliente', ClienteSchema);