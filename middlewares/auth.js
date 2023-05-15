const jwt = require('jsonwebtoken');
const verifyTok = async (req, res, next) => {
    try {
        const tok = req.header('authorization');
        // authentication
        if (!tok) {
            return res.status(401).json({ message: "invalid authentication or incredential" });
        }
        const accessToken = tok.split(" ")[1];

        // get data from token to authorization
        const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.id = id;
        next();

    } catch (error) {
        return res.status(401).json({ message: error.message })
    }
};
module.exports = {
    verifyTok
}