const router = require("express").Router();
const { getOrders, getOrdersByUserId, getOrderById, initOrder } = require('../controllers/order.controller');

router.get("/", getOrders);
router.get("/userId/:userId/", getOrdersByUserId);
router.get("/:id", getOrderById);
router.post("/orders", initOrder);



module.exports = router;
