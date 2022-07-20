const router = require('express').Router();
const { getInfor, updateInfor, createNewInfor, removeInfor } = require('../controllers/user.controller')
const { verifyTok } = require('../middlewares/auth')


router.post('/:accountId/creatProfile', createNewInfor)
router.get('/:accountId/getInfor', verifyTok, getInfor)
router.put('/:accountId/updateInfor', verifyTok, updateInfor)

router.delete('/:accountId/deleteInfor', verifyTok, removeInfor)




module.exports = router;
