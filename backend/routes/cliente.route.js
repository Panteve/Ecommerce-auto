const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controllers/cliente.controller")

router.get("/cliente", clienteCtrl.getCliente);
router.post("/cliente", clienteCtrl.createCliente);
router.get("/cliente/:documento", clienteCtrl.getUnicocliente);
router.put("/cliente/:documento", clienteCtrl.editarCliente);
router.delete("/cliente/:documento", clienteCtrl.eliminarCliente);


module.exports = router; 