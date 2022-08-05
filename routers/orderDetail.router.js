const { getOrderDetailById, getOrdersDetailByOrderId, getOrdersDetailByProductId, initOrderDetail } = require("../controllers/orderDetai.controller");

const router = require("express").Router();

router.get("/:id/orderDetail", getOrderDetailById)
router.get("/:orderId/orderDetail", getOrdersDetailByOrderId)
router.get("/:productId/orderDetail", getOrdersDetailByProductId)
router.post("/:orderId/orderDetail", initOrderDetail)

module.exports = router;
