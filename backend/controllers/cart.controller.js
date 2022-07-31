const { response } = require("express");
const { Op } = require("sequelize");
const { CartModel, ProductModel } = require("../models");

const getCartById = async () => {
  try {
    const { id } = req.params;

    const cart = await CartModel.findOne({
      where: {
        id,
      },
    });

    if (!cart) {
      return res.status(404).json({ message: "Not Found Cart" });
    }

    res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const carts = await CartModel.findAll({
      where: {
        userId,
      },
    });
    const arr = carts.map((item) => {
      return {id:item.productId };
    });
    const foundProducts = await ProductModel.findAll({
      where: {
        [Op.or]: arr,
      },
    });
    res.status(200).json(foundProducts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const getCartByProductId = async () => {
  try {
    const { productId } = req.query;

    const carts = await CartModel.findAll({
      where: {
        productId,
      },
    });

    res.status(200).json(carts);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const initCart = async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const foundCart = await CartModel.findOne({
      where: {
        [Op.and]: {
          userId,
          productId,
        },
      },
    });

    if (foundCart) {
      return res
        .status(404)
        .json({ message: "This product has been added to your cart" });
    }

    await CartModel.create({ userId, productId });

    res.status(201).json({ message: "Add your cart successfully" });
  } catch (error) {
    return res.status(500).json({ mesage: error.message });
  }
};
const removeCart = async(req,res)=>{
    try {
        const { userId, productId } = req.params;
    
        const foundCart = await CartModel.findOne({
          where: {
            [Op.and]: {
              userId,
              productId,
            },
          },
        });
    
        if (!foundCart) {
          return res
            .status(404)
            .json({ message: "This product never been added to your cart" });
        }
    
        await CartModel.destroy({where:{
            id:foundCart.id
        }});
    
        res.status(201).json({ message: "Remove your cart successfully" });
      } catch (error) {
        return res.status(500).json({ mesage: error.message });
      }
}

module.exports = {
  getCartById,
  getCartByProductId,
  getCartByUserId,
  initCart,
  removeCart
};
