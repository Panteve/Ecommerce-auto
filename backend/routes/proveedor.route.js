const express = require("express");
const router = express.Router();
const proveedorCrtl = require("../controllers/proveedor.controller")

router.get("/proveedor", proveedorCrtl.getProveedor);
router.post("/proveedor", proveedorCrtl.createProveedor);
router.get("/proveedor/:nombre", proveedorCrtl.getUnicoProveedor);
router.put("/proveedor/:nombre",proveedorCrtl.editarProveedor);
router.delete("/proveedor/:nombre", proveedorCrtl.eliminarProveedor);


module.exports = router; 