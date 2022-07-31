const jwt = require('jsonwebtoken');



// login to get token, after appending that token into header

const verifyTok = async (req, res, next) => {
    try {
        const tok = req.headers["access-token"];  
        // authentication
        if (!tok) {
            return res.status(403).json({ message: "invalid authentication" });
        }
        const accessToken = tok.split(" ")[1];

        // get data from token to authorization
        const { id } = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        req.id = id;
        next();

    } catch (error) {
        return res.status(500).json({ message: error.message })
    }
};




module.exports = {

    verifyTok,

}