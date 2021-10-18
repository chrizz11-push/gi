const jwt = require("jsonwebtoken");

module.exports = function (req,res,next) {
    const token = req.header("auth-token");

    if (!token) return res.status(400).send("access denied");

    try {
        const userToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.validUsers = userToken;
        next();
    }
    catch (error) {
        res.status(404).send(error.message);
    }}