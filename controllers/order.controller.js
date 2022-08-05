const { OrderModel } = require("../models");

const getOrders = async (req, res) => {
    try {
        const foundOrders = await OrderModel.findAll()

        res.status(200).json(foundOrders)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}


const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const foundOrder = await OrderModel.findByPk(id)

        if (!foundOrder) {
            return res.status(404).json({ message: "Not Found Order" })
        }
        res.status(200).json(foundOrder)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}

const getOrdersByUserId = async (req, res) => {
    try {
        const { userId } = req.params;
        const foundOrders = await OrderModel.findAll({
            userId
        })

        res.status(200).json(foundOrders)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }

}


const initOrder = async (req, res) => {
    try {
        const { userId } = req.body;

        const newOrder = await OrderModel.create({ userId })
        if (!newOrder) {
            return res.status(400).json({ message: "Create Order Unsuccessfully" })
        }

        res.status(201).json(newOrder)

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getOrders,
    getOrderById,
    getOrdersByUserId,
    initOrder
}