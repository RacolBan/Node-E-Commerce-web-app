const { UserModel } = require("../models");

const getUploadFile = (req, res) => {
    res.render("upload")
}

const postUploadFile = async (req, res) => {
    try {
        const { id } = req.params;
        const file = req.file
        if (!file) {
            return res.status(401).json({ message: "Pls provide an image" })
        }

        const found = await UserModel.findOne({
            where: {
                id,
            }
        })
        if (!found) {
            return res.status(404).json({ message: "Not Found User" })
        }

        await UserModel.update({ avatar: file.filename }, { where: { id } });

        return res.json({ message: "image uploaded", filename: file.filename });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}

module.exports = {
    getUploadFile,
    postUploadFile
} 