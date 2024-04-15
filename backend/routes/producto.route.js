const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const productoCtrl = require("../controllers/producto.controller")

router.get("/producto", productoCtrl.getProductos);
router.post("/producto", auth, productoCtrl.createProducto);
router.get("/producto/:parametro", productoCtrl.getUnicoProductos);
router.put("/producto/:refproducto", auth,productoCtrl.editarProductos);
router.delete("/producto/:refproducto", auth, productoCtrl.eliminarProducto);


module.exports = router; 