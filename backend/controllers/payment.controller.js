const { PayModel } = require("../models")

const getPayById = async (req, res) => {
    const { id } = req.params;

    try {
        const foundPay = await PayModel.findByPk(id);
        if (!foundPay) {
            return res.status(404).json({ mesasge: "Not Found Payment" });
        }
        res.status(200).json(foundPay);

    } catch (error) {
        res.status(500).json({ message: error.message });
        return
    }
}

const getPayByOrderId = async (req, res) => {
    const { orderId } = req.params

    try {
        const foundPay = await PayModel.findOne({
            where: {
                orderId,
            }
        });
        if (!foundPay) {
            return res.status(404).json({ message: "Not Found Payment" })
        }
        res.status(200).json(foundPay)
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

const initPay = async () => {
    const { orderId } = req.params;
    const { method, total } = req.body;
    try {
        const foundPay = await PayModel.findOne({
            where: {
                orderId,
            }
        });

        if (foundPay) {
            return res.status(409).json({ message: "Payment existed" })
        };

        const newPayment = await PayModel.create({ method, total, orderId })

        if (!newPayment) {
            return res.status(400).json({ message: "Create  Payment Unsuccessfully" })
        }
        res.status(201).json(newPayment)
    } catch (error) {
        return res.status(500).json({ message: error.mesasge })
    }
}

module.exports = {
    getPayById,
    getPayByOrderId,
    initPay
}