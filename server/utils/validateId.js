const validator = require('validator');

// Validate MongoDB ID in Params
const validate_id = (req, res, next) => {
    if (!req.params.id || !validator.isMongoId(req.params.id)) throw new Error('invalid id')
    next();
};

module.exports = {
    validate_id
}