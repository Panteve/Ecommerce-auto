const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const pedidoCtrl = require("../controllers/pedido.controller")

router.get("/pedido", auth, pedidoCtrl.getPedido);
router.post("/pedido", auth, pedidoCtrl.createPedido);
router.get("/pedido/:parametro", auth, pedidoCtrl.getUnicopedido);
router.delete("/pedido/:parametro", auth, pedidoCtrl.eliminarPedido);


module.exports = router; 