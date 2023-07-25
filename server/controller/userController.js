const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const createToken = require('../utils/tokenGenerator');
const userCollection = require('../model/userModel');
const { findUserByEmail } = require("../helper/user/authHelpler");
const bcrypt = require('bcrypt');


//signup
const register = expressAsyncHandler(async (req, res) => {
    let { name, role, email, password } = req.body;
    if (!name || !role || !email || !password) throw new AppError(400, "All fields required");

    let userExist = await findUserByEmail(email);
    if (userExist) {
        throw new AppError(409, "user already exists");
    } else {
        const user = new userCollection({
            name,
            email,
            role,
            password
        });

        await user.save();
        const token = createToken(user._id);
        res.status(201).json({
            created: true,
            email: user.email,
            role: user.role,
            token,
        });
    }
})

const doLogin = expressAsyncHandler(async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) throw new AppError(400, "All fields required");

    let user = await findUserByEmail(email);
    if (!user) throw new AppError(409, "user not exists");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new AppError(400, "Incorrect username or password")

    const token = createToken(user._id);
    res.status(201).json({
        email: user.email,
        role: user.role,
        token,
    });

})

module.exports = {
    register,
    doLogin
}