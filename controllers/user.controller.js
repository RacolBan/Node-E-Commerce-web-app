const bcrypt = require("bcrypt");
const { UserModel, AccountModel } = require("../models");
const sequelize = require("../models/config.model");
const jwt = require("jsonwebtoken");

const getInfor = async (req, res) => {
  try {
    const { accountId } = req.params;
    const inforUser = await UserModel.findOne({
      where: {
        accountId,
      },
    });

    if (!inforUser) {
      return res.status(404).json({ message: "Not Found Information User" });
    }

    res
      .status(200)
      .json({ message: "Get information User successfully", inforUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getInforByAdmin = async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await UserModel.findOne({ where: { id: userId } });
    if (!foundUser) {
      return res.status(404).json({ message: "not found information User" });
    }
    const foundAccount = await AccountModel.findOne({
      where: { id: foundUser.accountId },
    });
    if (!foundAccount) {
      return res.status(404).json({ message: "not found information Account" });
    }
    const User = {
      username: foundAccount.username,
      role: foundAccount.role,
      firstName: foundUser.firstName,
      lastName: foundUser.lastName,
      avatar: foundUser.avatar,
      email: foundUser.email,
      phone: foundUser.phone,
      address: foundUser.address,
    };
    res.status(200).json({ message: "get information successfully", User });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const getAllInfor = async (req, res) => {
  try {
    const accounts = await AccountModel.findAll();
    let arr = [];
    for (const element of accounts) {
      const found = await UserModel.findOne({
        where: {
          accountId: element.id,
        },
      });
      const obj = {
        id: found.id,
        username: element.username,
        role: element.role,
        firstName: found.firstName,
        lastName: found.lastName,
        email: found.email,
        address: found.address,
        phone: found.phone,
        avatar: found.avatar,
      };
      arr.push(obj);
    }
    res.status(200).json(arr);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const createNewInfor = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { firstName, lastName, email, address, phone, username, password } =
      req.body;

    // First, we start a transaction and save it into a variable

    const found = await AccountModel.findOne(
      {
        where: {
          username,
        },
      },
      { transaction: t }
    );
    if (found) {
      return res.status(409).json({ message: "username has existed" });
    }
    // validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password is at least 6 characters long." });
    }

    //password Encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const account = {
      username: username,
      hashPwd: passwordHash,
    };

    // SAVE ACCOUNT
    const newAccount = await AccountModel.create(account, { transaction: t });
    // prevent hashPash from showing on UI
    delete newAccount.dataValues.hashPwd;

    if (!newAccount) {
      // ROLLBACK TRANSACTION
      return res
        .status(400)
        .json({ message: "create new Account unsuccesfully" });
    }

    const foundProfile = await UserModel.findOne(
      {
        where: {
          accountId: newAccount.id,
        },
      },
      { transaction: t }
    );

    if (foundProfile) {
      // ROLLBACK TRANSACTION
      return res.status(400).json({ message: "user has been existed" });
    }

    const profile = {
      firstName,
      lastName,
      email,
      address,
      phone,
      accountId: newAccount.id,
    };

    // save data to DB
    const newInfor = await UserModel.create(profile, { transaction: t });
    
    const accesstoken = jwt.sign(
      { data: newInfor },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    res.status(201).json({
      message: "Create Successfully",
      newInfor,
      newAccount,
      accesstoken,
    });
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};
const createNewInforByAdmin = async (req, res) => {
  const t = await sequelize.transaction();

  try {
    const { firstName, lastName, email, address, phone, username, password } =
      req.body;
    const file = req.file;
    if (!file) {
      return res.status(404).json({ message: "Pls provide an image" });
    }
    // First, we start a transaction and save it into a variable

    const found = await AccountModel.findOne(
      {
        where: {
          username,
        },
      },
      { transaction: t }
    );
    if (found) {
      return res.status(409).json({ message: "username has existed" });
    }
    // validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password is at least 6 characters long." });
    }

    //password Encryption
    const passwordHash = await bcrypt.hash(password, 10);

    const account = {
      username: username,
      hashPwd: passwordHash,
    };

    // SAVE ACCOUNT
    const newAccount = await AccountModel.create(account, { transaction: t });
    // prevent hashPash from showing on UI
    delete newAccount.dataValues.hashPwd;

    if (!newAccount) {
      // ROLLBACK TRANSACTION
      return res
        .status(400)
        .json({ message: "create new Account unsuccesfully" });
    }

    const foundProfile = await UserModel.findOne(
      {
        where: {
          accountId: newAccount.id,
        },
      },
      { transaction: t }
    );

    if (foundProfile) {
      // ROLLBACK TRANSACTION
      return res.status(400).json({ message: "user has been existed" });
    }

    const profile = {
      firstName,
      lastName,
      email,
      address,
      phone,
      avatar: file.filename,
      accountId: newAccount.id,
    };

    // save data to DB
    const newInfor = await UserModel.create(profile, { transaction: t });

    if (!newInfor) {
      await t.rollback();
      return res
        .status(400)
        .json({ message: "create new Profile unsuccesfully" });
    }

    res
      .status(201)
      .json({ message: "Created new User successfully", newInfor, newAccount });

    // COMMIT TRANSACTION
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};
const updateInfor = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { firstName, lastName, address } = req.body;

    const update = {};
    if (firstName) update.firstName = firstName;
    if (lastName) update.lastName = lastName;
    if (address) update.address = address;

    const foundInfor = await UserModel.findOne({
      where: {
        accountId,
      },
    });

    if (!foundInfor) {
      return res.status(404).json({ message: "Not Found Information User" });
    }

    const updateInfor = await UserModel.update(update, {
      where: {
        accountId,
      },
    });

    if (!updateInfor) {
      return res.status(400).json({ message: "update fail User" });
    }

    res.status(200).json({ message: "update succesfully User" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateInforByAdmin = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userId } = req.params;
    const { firstName, lastName, address, role } = req.body;
    const foundInfor = await UserModel.findOne({
      where: {
        id: userId,
      },
    });
    if (!foundInfor) {
      return res.status(404).json({ message: "Not Found Information User" });
    }
    await UserModel.update(
      { firstName: firstName, lastName: lastName, address: address },
      { where: { id: userId } }
    ),
      { transaction: t };
      const foundAccount = await AccountModel.findOne({
        where:{id:foundInfor.accountId}
      })
      if(!foundAccount){
        await t.rollback()
        return res.status(404).json({message:"Not Found Information Account "})
      }
      await AccountModel.update(
        { role: role },
        { where: { id: foundInfor.accountId } }
      ),
      res.status(201).json({message:"updated User successfully"})
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const removeInfor = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { userId } = req.params;
    const foundInfor = await UserModel.findOne(
      {
        where: {
          id: userId,
        },
      },
      { transaction: t }
    );

    if (!foundInfor) {
      return res.status(404).json({ message: "not found information User" });
    }
    await UserModel.destroy(
      {
        where: {
          id: userId,
        },
      },
      { transaction: t }
    );
    const foundAccount = await AccountModel.findOne(
      {
        where: {
          id: foundInfor.accountId,
        },
      },
      { transaction: t }
    );
    if (!foundAccount) {
      await t.rollback();
      return res.status(404).json({ message: "not found information Account" });
    }
    await AccountModel.destroy(
      {
        where: {
          id: foundInfor.accountId,
        },
      },
      { transaction: t }
    );
    res.json({ message: "delete successfully" });
    await t.commit();
  } catch (error) {
    await t.rollback();
    return res.status(500).json({ message: error.message });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    const { id } = req.params;
    const file = req.file;
    if (!file) {
      return res.status(401).json({ message: "Pls provide an image" });
    }

    const found = await UserModel.findOne({
      where: {
        id,
      },
    });
    if (!found) {
      return res.status(404).json({ message: "Not Found User" });
    }

    await UserModel.update({ avatar: file.filename }, { where: { id } });

    res.json({ message: "avatar uploaded", filename: file.filename });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getInfor,
  getInforByAdmin,
  createNewInfor,
  updateInfor,
  removeInfor,
  uploadAvatar,
  getAllInfor,
  createNewInforByAdmin,
  updateInforByAdmin,
};
