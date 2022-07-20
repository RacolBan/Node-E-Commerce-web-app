const router = require("express").Router();
const upload = require('../middlewares/upload')
const { getUploadFile, postUploadFile } = require('../controllers/upload.controller')
router.post("/upload/:id", upload.single('file'), postUploadFile)

router.get("/upload", getUploadFile)


module.exports = router;