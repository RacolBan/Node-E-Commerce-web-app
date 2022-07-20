const router = require('express').Router();
const { initManufacturer, getManufacturer, updateManufacturer, removeManufacturer } = require('../controllers/manufacture.controller')
const { verifyTok } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/permission.js');


router.get("/manufacture", getManufacturer);
router.post("/manufacture", verifyTok, isAdmin, initManufacturer)
router.put("/manufacture", verifyTok, isAdmin, updateManufacturer)
router.delete("/manufactureId/manufacture", verifyTok, isAdmin, removeManufacturer)


module.exports = router;
