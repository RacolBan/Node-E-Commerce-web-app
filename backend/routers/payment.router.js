const { getPayById } = require("../controllers/payment.controller");

const router = require("express").Router();

router.get("/payments/:id", getPayById);
router.get("orders/:orderId/payments", getPayById);
router.post("orders/:orderId/payments", getPayById);

module.exports = router;