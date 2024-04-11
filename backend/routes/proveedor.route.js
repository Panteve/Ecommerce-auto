const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const proveedorCrtl = require("../controllers/proveedor.controller")

router.get("/proveedor", auth, proveedorCrtl.getProveedor);
router.post("/proveedor", auth, proveedorCrtl.createProveedor);
router.get("/proveedor/:nombre", auth, proveedorCrtl.getUnicoProveedor);
router.put("/proveedor/:nombre", auth,proveedorCrtl.editarProveedor);
router.delete("/proveedor/:nombre", auth, proveedorCrtl.eliminarProveedor);


module.exports = router; 