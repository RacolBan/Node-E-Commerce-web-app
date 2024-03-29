const CartModel = require("./cart.model");
const CategoryModel = require("./category.model");
const UserModel = require("./user.model");
const ManufactureModel = require("./manufacture.model");
const OrderModel = require("./order.model");
const OrderdetailModel = require("./orderDetail.model");
const PayModel = require("./payment.model");
const ProductModel = require("./product.model");
const AccountModel = require("./account.model");

// UserModel vs AccountModel: one-to-one
AccountModel.hasOne(UserModel, {
    foreignKey: {
        name: "accountId",
    }
});

UserModel.belongsTo(AccountModel, {
    foreignKey: {
        name: "accountId",
    },
});

// UserModel vs OrderModel : one to many
UserModel.hasMany(OrderModel, {
    foreignKey: {
        name: "userId",
    }
});

OrderModel.belongsTo(UserModel, {
    foreignKey: {
        name: "userId",
    }
});
//ManufactureModel vs CategoryModel: one to many

CategoryModel.hasMany(ManufactureModel, {
    foreignKey: {
        name: "categoryId",
    }
});

ManufactureModel.belongsTo(CategoryModel, {
    foreignKey: {
        name: "categoryId",
    }
});
//Category vs ProductModel : one to many

CategoryModel.hasMany(ProductModel, {
    foreignKey: {
        name: "categoryId",
    }
});

ProductModel.belongsTo(CategoryModel, {
    foreignKey: {
        name: "categoryId",
    },
});
//ManufactureModel vs ProductModel: one to many

ManufactureModel.hasMany(ProductModel, {
    foreignKey: {
        name: "manufactureId",
    }
});

ProductModel.belongsTo(ManufactureModel, {
    foreignKey: {
        name: "manufactureId",
    },
});
// Order versus OrderDetail
OrderModel.hasMany(OrderdetailModel, {
    foreignKey: {
        name: "orderId",
    }
});

OrderdetailModel.belongsTo(OrderModel, {
    foreignKey: {
        name: "orderId",
    },
});
//ProductModel vs OrderDetail: one to one

ProductModel.hasOne(OrderdetailModel, {
    foreignKey: {
        name: "productId",
    },
});

OrderdetailModel.belongsTo(ProductModel, {
    foreignKey: {
        name: "productId",
    },
});
// User vs Cart: one to many
UserModel.hasMany(CartModel, {
    foreignKey: {
        name: "userId",
    }
});
CartModel.belongsTo(UserModel, {
    foreignKey: {
        name: "userId",
    },
});
// ProductModel vs CartModel: one to many

ProductModel.hasMany(CartModel, {
    foreignKey: {
        name: "productId",
    },
});
CartModel.belongsTo(ProductModel, {
    foreignKey: {
        name: "productId",
    },
});
// OrderModel vs PayModel: one to one
OrderModel.hasOne(PayModel, {
    foreignKey: {
        name: "orderId",
    }
});

PayModel.belongsTo(OrderModel, {
    foreignKey: {
        name: "orderId",
    },
});

AccountModel.sync();
UserModel.sync();
OrderModel.sync();
CategoryModel.sync();
ManufactureModel.sync();
ProductModel.sync();
OrderdetailModel.sync();
CartModel.sync();
PayModel.sync();
module.exports = {
    UserModel,
    AccountModel,
    ProductModel,
    ManufactureModel,
    CategoryModel,
    OrderdetailModel,
    OrderModel,
    CartModel,
    PayModel,
};
