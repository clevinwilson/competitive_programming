const asyncHandler = require("express-async-handler");
const AppError = require("./error")


function validateBody(schema) {
    return asyncHandler(async (req, res, next) => {
        try {
            req.body = await schema.validate(req.body, { stripUnknown: true });
            next();
        } catch (err) {
            throw new AppError(400, err.errors[0]);
        }
    })
}

module.exports = {
    validateBody
}