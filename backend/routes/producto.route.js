const express = require("express");
const router = express.Router();
const productoCtrl = require("../controllers/producto.controller")

router.get("/producto", productoCtrl.getProductos);
router.post("/producto", productoCtrl.createProducto);
router.get("/producto/:refproducto", productoCtrl.getUnicoProductos);
router.put("/producto/:refproducto",productoCtrl.editarProductos);
router.delete("/producto/:refproducto", productoCtrl.eliminarProducto);


module.exports = router; 