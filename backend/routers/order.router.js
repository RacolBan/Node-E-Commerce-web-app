const router = require("express").Router();
const { getOrders, getOrdersByUserId, getOrderById, initOrder } = require('../controllers/order.controller');

router.get("/orders", getOrders);
router.get("/:userId/orders", getOrdersByUserId);
router.get("/:id/orders", getOrderById);
router.post("/orders", initOrder);



module.exports = router;
