const { ManufactureModel } = require("../models")

const getManufacturer = async (req, res) => {
    try {

        const manufacturer = await ManufactureModel.findAll()
        return res.status(200).json(manufacturer)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const initManufacturer = async (req, res) => {
    try {
        const { name } = req.body;
        console.log(name);
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                name
            }
        })
        if (foundManufacturer) {
            return res.status(400).json({ message: "manufacturer has been existed" })
        }
        // save data
        const newManufacture = await ManufactureModel.create({ name })
        if (!newManufacture) {
            return res.status(400).json({ message: "Create fail" })
        }

        return res.status(200).json(newManufacture)
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}
const removeManufacturer = async (req, res) => {
    try {
        const { manufacturerId } = req.params;
        const foundManufacturer = await ManufactureModel.findOne({
            where: {
                manufacturerId
            }
        })
        if (!foundManufacturer) {
            return res.status(404).json({ message: "Not Found" })
        }

        // Delete data
        await ManufactureModel.destroy({
            where: {
                name
            }
        })
        return res.status(200).json({ message: "Delete successfully" })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

const updateManufacturer = async (req, res) => {
    try {
        const { id, name } = req.body;
        const foundManufacturer = await ManufactureModel.findByPk(id)

        if (!foundManufacturer) {
            return res.status(404).json({ message: "Not Found" })
        }

        const update = {};

        if (name) update.name = name;

        await ManufactureModel.update(update, {
            where: {
                id
            }
        })
        const updatedManufacturer = await ManufactureModel.findByPk(id)
        return res.status(200).json({ message: "update successfully", updatedManufacturer })


    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getManufacturer,
    initManufacturer,
    removeManufacturer,
    updateManufacturer

}