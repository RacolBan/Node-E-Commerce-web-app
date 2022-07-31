const { Op } = require("sequelize");
const { ProductModel, CategoryModel, ManufactureModel } = require("../models");

const getAllProduct = async (req, res) => {
  try {
    const productList = await ProductModel.findAll();
    res.status(200).json(productList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { productId } = req.params;
    const found = await ProductModel.findOne({
      where: {
        id: productId,
      },
    });
    if (!found) {
      return res.status(404).json({ message: "Not found Product" });
    }
    res.status(200).json({ message: "Get product successfully", found });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// search data by manufactureid
const getProductByManufactureId = async (req, res) => {
  try {
    const { manufactureId } = req.params;

    const products = await ProductModel.findAll({
      where: {
        manufactureId,
      },
    });

    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// search data by category ID
const getProductByCategoryId = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const products = await ProductModel.findAll({
      where: {
        categoryId,
      },
    });
    res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const pagination = async (req, res) => {
  try {
    let { page, limit } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let { count, rows } = await ProductModel.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
    });
    res.status(200).json({
      count,
      rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const paginationByCategory = async (req, res) => {
  const { categoryId } = req.params;
  try {
    let { page, limit, manufacture, price } = req.query;
    if (manufacture == 0) {
      if (price == "asc") {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            categoryId,
          },
          order: [["price", "ASC"]],
          attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "createdAt",
            "updatedAt",
            "categoryId",
            "manufactureId",
          ],
        });
        res.status(200).json({
          count,
          rows,
        });
      } else if (price == "desc") {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            categoryId,
          },
          order: [["price", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "createdAt",
            "updatedAt",
            "categoryId",
            "manufactureId",
          ],
        });
        res.status(200).json({
          count,
          rows,
        });
      } else {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            categoryId,
          },
        });
        res.status(200).json({
          count,
          rows,
        });
      }
    } else {
      if (price == "asc") {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            manufactureId: manufacture,
          },
          order: [["price", "ASC"]],
          attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "createdAt",
            "updatedAt",
            "categoryId",
            "manufactureId",
          ],
        });
        res.status(200).json({
          count,
          rows,
        });
      } else if (price == "desc") {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            manufactureId: manufacture,
          },
          order: [["price", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "description",
            "image",
            "createdAt",
            "updatedAt",
            "categoryId",
            "manufactureId",
          ],
        });
        res.status(200).json({
          count,
          rows,
        });
      } else {
        const offset = (parseInt(page) - 1) * parseInt(limit);

        let { count, rows } = await ProductModel.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
          where: {
            manufactureId: manufacture,
          },
        });
        res.status(200).json({
          count,
          rows,
        });
      }
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const paginationByManufacture = async (req, res) => {
  const { manufactureId } = req.params;
  try {
    let { page, limit } = req.query;
    const offset = (parseInt(page) - 1) * parseInt(limit);

    let { count, rows } = await ProductModel.findAndCountAll({
      limit: parseInt(limit),
      offset: parseInt(offset),
      where: {
        manufactureId,
      },
    });
    res.status(200).json({
      count,
      rows,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const initProduct = async (req, res) => {
  try {
    const { name, price, description, nameManufacture, nameCategory } =
      req.body;
    const file = req.file;

    if (!file) {
      return res.status(404).json({ message: "Pls provide an image" });
    }
    // find manufacturer
    const foundManufacturer = await ManufactureModel.findOne({
      where: {
        name: nameManufacture,
      },
    });
    if (!foundManufacturer) {
      return res.status(404).json({ message: "Not Found Manufacturer" });
    }

    // find category
    const foundCategory = await CategoryModel.findOne({
      where: {
        name: nameCategory,
      },
    });
    if (!foundCategory) {
      return res.status(404).json({ message: "Not Found Category" });
    }

    // find product by manufacture
    const foundProduct = await ProductModel.findOne({
      where: {
        [Op.and]: {
          manufactureId: foundManufacturer.id,
          name,
        },
      },
    });
    if (foundProduct) {
      return res.status(409).json({ message: "product has been existed" });
    }

    const product = {
      name,
      price,
      description,
      image: file.filename,
      categoryId: foundCategory.id,
      manufactureId: foundManufacturer.id,
    };

    // save data to DB
    const newProduct = await ProductModel.create(product);

    if (!newProduct) {
      return res.status(400).json({ message: "Create product unsuccessfully" });
    }
    res.status(201).json({ message: "Created New Product", newProduct });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, description, image, categoryId, manufactureId } =
      req.body;
    const { productId } = req.params;

    const foundProduct = await ProductModel.findByPk(productId);

    if (!foundProduct) {
      return res.status(404).json({ message: "Not Found Product" });
    }

    const update = {};
    if (name) update.name = name;
    if (price) update.price = price;
    if (description) update.description = description;
    if (image) update.name = name;
    if (categoryId) update.categoryId = categoryId;
    if (manufactureId) update.manufactureId = manufactureId;

    await ProductModel.update(update, {
      where: {
        id: productId,
      },
    });

    const foundProductUpdate = await ProductModel.findByPk(productId);

    res.status(201).json({
      message: "update product successfully",
      foundProductUpdate,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const removeProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    const foundProduct = await ProductModel.findByPk(productId);

    if (!foundProduct) {
      return res.status(404).json({ message: "Not Found Product" });
    }

    // delete data from DB
    await ProductModel.destroy({
      where: {
        id: productId,
      },
    });

    res.status(201).json({
      message: "Delete successfully",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query;
    const foundProducts = await ProductModel.findAll({
      where: {
        name: {
          [Op.like]: `%${query}%`,
        },
      },
    });
    res.status(200).json({
      message: "Search successfully",foundProducts
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllProduct,
  getProductById,
  getProductByCategoryId,
  getProductByManufactureId,
  pagination,
  initProduct,
  updateProduct,
  removeProduct,
  paginationByCategory,
  paginationByManufacture,
  searchProducts,
};
