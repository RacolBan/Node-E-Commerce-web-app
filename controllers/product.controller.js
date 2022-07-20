const { Op } = require("sequelize");
const { ProductModel } = require("../models");

const getAllProduct = async (req, res) => {
    try {

        const productList = await ProductModel.findAll();
        if (!productList) {
            return res.status(404).json({ message: "Not Found data" })
        }

        return res.status(200).json(productList);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const getProductByName = async (req, res) => {
    try {
        const { name } = req.query;

        const product = await ProductModel.findOne({
            where: {
                name
            }
        });

        if (!product) {
            return res.status(404).json({ message: "Not Found data" })
        };

        return res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

// search data by manufactureid
const getProductByManufactureId = async (req, res) => {
    try {
        const { manufactureId } = req.params;

        const products = await ProductModel.findAll({
            where: {
                manufactureId
            }
        })
        if (!products) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

// search data by category ID
const getProductByCategoryId = async (req, res) => {
    try {
        const { categoryId } = req.params;

        const products = await ProductModel.findAll({
            where: {
                categoryId
            }
        })
        if (!products) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(products)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const pagination = async (req, res) => {

    try {

        let { offset, limit } = req.query;

        page = typeof page === "string" ? parseInt(page) : page;
        size = typeof size === "string" ? parseInt(size) : size;

        let { count, rows } = await ProductModel.findAndCountAll({
            limit,
            offset,
        });

        // transform rows
        rows = rows.map((singleRow) => {
            return singleRow.dataValues;
        });

        return res.status(200).json({
            count,
            limit,
            offset,
            rows,
        });
    } catch (error) {
        res.status(500).json({ message: error.message })

    }

}

const initProduct = async (req, res) => {
    try {
        const { name, price, description, image, categoryId, manufactureId } = req.body;

        const foundProduct = await ProductModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    name
                }
            }
        })

        if (foundProduct) {
            return res.status(409).json({ message: "product has been existed" })
        }

        const product = {
            name,
            price,
            description,
            image,
            categoryId
        }

        // save data to DB
        const newProduct = await ProductModel.create(product)

        if (!newProduct) {
            return res.status(400).json({ message: "Create data fail" })
        }
        return res.status(201).json(newProduct);

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

const updateProduct = async (req, res) => {
    try {
        const { name, price, description, image, categoryId, manufactureId, productId } = req.body;

        const foundProduct = await ProductModel.findByPk(productId)



        if (!foundProduct) {
            return res.status(404).json({ message: "Not Found" })
        }

        const update = {}
        if (name) update.name = name;
        if (price) update.price = price;
        if (description) update.description = description;
        if (image) update.name = name;
        if (categoryId) update.categoryId = categoryId;
        if (manufactureId) update.manufactureId = manufactureId;




        await ProductModel.update(update, {
            where: {
                productId
            }
        })

        const foundProductUpdate = await ProductModel.findByPk(productId)


        return res.status(201).json({
            msg: "update successfully",
            foundProductUpdate
        });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}

const removeProduct = async (req, res) => {
    try {
        const { productId } = req.params;

        const foundProduct = await ProductModel.findByPk(productId)

        if (!foundProduct) {
            return res.status(404).json({ message: "Not Found" })
        }

        // delete data from DB
        await ProductModel.destroy({
            where: {
                productId
            }
        })

        return res.status(201).json({
            msg: "Delete successfully",
        });

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}


module.exports = {
    getAllProduct,
    getProductByName,
    getProductByCategoryId,
    getProductByManufactureId,
    pagination,
    initProduct,
    updateProduct,
    removeProduct

}