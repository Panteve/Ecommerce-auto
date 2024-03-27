const express = require("express");
const router = express.Router();
const proveedorCrtl = require("../controllers/proveedor.controller")

router.get("/proveedor", proveedorCrtl.getProveedor);
router.post("/proveedor", proveedorCrtl.createProveedor);
router.get("/proveedor/:refpedido", proveedorCrtl.getUnicoProveedor);
router.put("/proveedor/:refpedido",proveedorCrtl.editarProveedor);
router.delete("/proveedor/:refpedido", proveedorCrtl.eliminarProveedor);


module.exports = router; 