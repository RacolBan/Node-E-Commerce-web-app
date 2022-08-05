const { getCartById, getCartByUserId, getCartByProductId, initCart,removeCart } = require('../controllers/cart.controller');
const router = require("express").Router();

router.get("/cart/:id", getCartById)
router.get("/users/:userId", getCartByUserId)
router.get("/products/:productId/cart", getCartByProductId)
router.post("/users/:userId/products/:productId", initCart)
router.delete("/users/:userId/products/:productId", removeCart)

module.exports = router;
