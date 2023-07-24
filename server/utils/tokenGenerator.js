const { sign, JwtPayload } = require('jsonwebtoken');
const { ObjectId } = require('bson');
const dotenv = require('dotenv');
dotenv.config();

function createToken(id) {
    return sign({ id }, process.env.JWT_SECRET, { expiresIn: '2d' })
}

module.exports = createToken;