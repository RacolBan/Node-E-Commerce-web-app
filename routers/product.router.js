const express = require("express");
const router = express.Router();
const {
  getAllProduct,
  getProductByName,
  getProductByCategoryId,
  getProductByManufactureId,
  pagination,
  initProduct,
  updateProduct,
  removeProduct
} = require("../controllers/product.controller")
const { verifyTok } = require("../middlewares/auth");
const { isMember, isAdmin } = require("../middlewares/permission");


// API get all product
router.get("/products", verifyTok, getAllProduct);
router.get("/productId/products", verifyTok, getProductByName);
router.get("/categoryId/products", verifyTok, getProductByCategoryId);
router.get("/manufactureId/products", verifyTok, getProductByManufactureId);
router.get("/pagination/products", pagination);
router.post("/products", initProduct);
router.put("/products", updateProduct);
router.delete("/products", removeProduct);


router.get("/pagination/products", pagination);



// API create new book
router.post("/", initProduct);


// function create fake book
const createFakeBook = (size) => {
  let result = [];
  for (let i = 0; i < size; i++) {
    const book = () => {
      return {
        name: faker.name.findName(),
        author: faker.name.findName()
      }
    }
    result.push(book());

  };
  return result;
}


router.post("/fake", async (req, res) => {
  try {
    const books = await BookModel.bulkCreate(createFakeBook(100));
    res.status(201).json({ message: "generate book succesfully! " });
  } catch (error) {
    res.status(500).json({ message: error });

  }

});



module.exports = router;
