const { Op } = require("sequelize")
const { CategoryModel } = require("../models")

const getCategory = async (req, res) => {
    try {

        const categories = await CategoryModel.findAll()
        if (!categories) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const getCategoryByManufactureId = async (req, res) => {
    try {
        const { manufactureId } = req.params;

        const category = await CategoryModel.findAll({
            where: {
                manufactureId
            }
        })
        if (!category) {
            return res.status(404).json({ message: "Not found" })
        }
        return res.status(200).json(category)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const initCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name } = req.body;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    name
                }
            }
        })
        if (foundCategory) {
            return res.status(400).json({ message: "category has been existed" })
        }

        // save data
        const newCategory = await CategoryModel.create({ name, manufactureId })
        if (!newCategory) {
            return res.status(400).json({ message: "Create fail" })
        }

        return res.status(200).json(newCategory)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateCategory = async (req, res) => {
    try {
        const { manufactureId } = req.params;
        const { name, id } = req.body;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    id
                }
            }
        })
        if (!foundCategory) {
            return res.status(404).json({ message: "Not Found" })
        }

        const update = {};
        if (name) update.name = name;

        await CategoryModel.update(update, {
            where: {
                [Op.and]: {
                    id,
                    manufactureId
                }
            }
        })


        return res.status(200).json({ message: "update successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const removeCategory = async (req, res) => {
    try {
        const { manufactureId, categoryId } = req.query;

        const foundCategory = await CategoryModel.findOne({
            where: {
                [Op.and]: {
                    manufactureId,
                    categoryId
                }
            }
        })
        if (!foundCategory) {
            return res.status(404).json({ message: "Not Found" })
        }


        await CategoryModel.destroy({
            where: {
                [Op.and]: {
                    categoryId,
                    manufactureId
                }
            }
        })

        return res.status(200).json({ message: "delete successfully" })
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getCategory,
    initCategory,
    removeCategory,
    updateCategory,
    getCategoryByManufactureId

}