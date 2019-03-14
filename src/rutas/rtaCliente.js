const express = require('express');
const router = express.Router();

//controladores
const cliente_controller = require('../controladores/ctrCliente');
const estudio_controller = require('../controladores/ctrCredito');

//Rutas api
router.get('/', cliente_controller.buscartodos);
router.get('/:id', cliente_controller.buscar_id);
router.get('/:identificacion/buscar', cliente_controller.buscar_identificacion);
router.post('/crear', cliente_controller.crear);
router.put('/:id/actualizar', cliente_controller.actualizar);
router.delete('/:id/eliminar', cliente_controller.eliminar);
router.post('/solicitudcredito', estudio_controller.estudiocredito);

module.exports = router;