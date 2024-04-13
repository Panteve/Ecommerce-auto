const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controllers/cliente.controller");
const auth = require("../middleware/auth")

router.get("/cliente", auth, clienteCtrl.getCliente);
router.post("/cliente", clienteCtrl.createCliente);
router.get("/cliente/:documento", auth, clienteCtrl.getUnicocliente);
router.put("/cliente/:documento", auth, clienteCtrl.editarCliente);
router.delete("/cliente/:documento", clienteCtrl.eliminarCliente);


module.exports = router; 