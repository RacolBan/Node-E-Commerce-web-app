const router = require('express').Router();
const { getCategory, initCategory, updateCategory, removeCategory } = require('../controllers/category.controller.js');
const { verifyTok } = require('../middlewares/auth.js');
const { isAdmin } = require('../middlewares/permission.js');


router.get("/categories/:manufactureId", getCategory);
router.post("/categories/:manufactureId", verifyTok, isAdmin, initCategory)
router.put("/categories/:manufactureId", verifyTok, isAdmin, updateCategory)
router.delete("/categories/:manufactureId", verifyTok, isAdmin, removeCategory)


module.exports = router;
