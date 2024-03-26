const express = require("express");
const router = express.Router();
const clienteCtrl = require("../controllers/cliente.controller")

router.get("/admin", clienteCtrl.getAdmins);
router.post("/admin", clienteCtrl.createAdmins);
router.get("/admin/:documento", clienteCtrl.getUnicoAdmins);
router.put("/admin/:documento", clienteCtrl.editarAdmins);
router.delete("/admin/:documento", clienteCtrl.eliminarAdmins);


module.exports = router; 