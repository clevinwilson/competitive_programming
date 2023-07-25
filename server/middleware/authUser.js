const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");
const AppError = require("../utils/error");

const verifyUserLogin= asyncHandler(async (req, res, next) => {

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({ _id: decoded.id });
        if (!user) {
            throw new AppError(401, "invalid token");
        } else {
            req.userId=user._id;
            next();
        }
    } else {
        throw new AppError(401, "No authorization");
    }
})

module.exports = { verifyUserLogin }