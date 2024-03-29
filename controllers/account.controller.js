var jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { AccountModel, UserModel } = require("../models");
const sendMail = require('../services/email.service');


const createAccessToken = (account) => {
  return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "1d" });
};
const createTempAccessToken = (account) => {
  return jwt.sign(account, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await AccountModel.findOne({
      where: {
        username,
      },
    });

    if (!account) return res.status(404).json({ message: "Account does not exist." });

    const foundUser = await UserModel.findOne({ where: { accountId: account.id } })
    if (!foundUser) {
      return res.status(404).json({ message: "User does not exist." })
    }
    // Compare encrypted password with hash_pwd (true)
    const isMatch = await bcrypt.compare(password, account.hashPwd);

    if (!isMatch) return res.status(400).json({ message: "Incorrect password." });

    // If login success , create access token and refresh token
    const accesstoken = createAccessToken({ id: account.id });

    res.status(200).json({
      message: "login successful",
      accesstoken,
      id: account.id,
      username: account.username,
      role: account.role,
      userId: foundUser.id
    });

  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};


const changePassword = async (req, res) => {
  try {
    const { accountId: id } = req.params;
    const { password, newPassword } = req.body;

    const foundAccount = await AccountModel.findByPk(id);


    if (!foundAccount) {
      return res.status(404).json({ message: "Not Found Account" })
    };

    const isMatch = await bcrypt.compare(password, foundAccount.dataValues.hashPwd);

    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password." });
    }
    const newPassHash = await bcrypt.hash(newPassword, 10);

    await AccountModel.update({ hashPwd: newPassHash }, {
      where: {
        id
      }
    });

    res.json({ message: "updated password successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });

  }

}

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const found = await UserModel.findOne({
      where: {
        email
      }
    })
    if (!found) {
      return res.status(409).json({ message: "Email not exist" })
    }

    const payload = {
      email: found.email,
      id: found.accountId
    }

    const tempToken = createTempAccessToken(payload);

    // create link just only exist 15min by token
    const link = `http://localhost:3000/reset/${tempToken}`
    // send email to notify
    await sendMail(
      `${email}`,
      `Give you link to reset password`,
      `Kick this link:${link} into the reset password page `
    )

    res.json({
      message: "password reset has been sent ur email",
      tempToken,
      accountId: found.accountId
    })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}

const resetPassword = async (req, res) => {
  const { accountId: id } = req.params;
  const { newPassword } = req.body;

  // if FE not verify token so BE must get temptoken to verify at here
  try {

    // password Encryption
    const passwordHash = await bcrypt.hash(newPassword, 10);

    // update newPassword for account
    await AccountModel.update({ hashPwd: passwordHash }, {
      where: {
        id
      }
    });

    res.status(200).json({ message: "reset password successfully" })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }

}


module.exports = {
  login,
  changePassword,
  forgotPassword,
  resetPassword
};
