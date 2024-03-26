const express = require("express");
const router = express.Router();
const pedidoCtrl = require("../controllers/pedido.controller")

router.get("/pedido", pedidoCtrl.getPedido);
router.post("/pedido", pedidoCtrl.createPedido);
router.get("/pedido/:refpedido", pedidoCtrl.getUnicopedido);
router.delete("/pedido/:refpedido", pedidoCtrl.eliminarPedido);


module.exports = router; 