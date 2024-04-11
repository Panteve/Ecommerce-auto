const express = require("express");
const router = express.Router();
const adminCtrl = require("../controllers/admin.controller")
const auth = require("../middleware/auth")

router.get("/admin", auth, adminCtrl.getAdmins);
router.post("/admin", auth, adminCtrl.createAdmins);
router.get("/admin/:documento", auth, adminCtrl.getUnicoAdmins);
router.put("/admin/:documento", auth, adminCtrl.editarAdmins);
router.delete("/admin/:documento", auth, adminCtrl.eliminarAdmins);


module.exports = router; 