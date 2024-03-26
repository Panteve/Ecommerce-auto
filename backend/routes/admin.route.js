const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller")

router.get("/admin", adminCtrl.getAdmins);
router.post("/admin", adminCtrl.createAdmins);
router.get("/admin/:documento", adminCtrl.getUnicoAdmins);
router.put("/admin/:documento", adminCtrl.editarAdmins);
router.delete("/admin/:documento", adminCtrl.eliminarAdmins);


module.exports = router; 