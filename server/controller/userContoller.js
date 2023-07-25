const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const createToken = require('../utils/tokenGenerator');
const userCollection =require('../model/userModel');
const { findUserByEmail } = require("../helper/authHepler");

//signup
const register = expressAsyncHandler(async (req, res) => {
    const { phone } = req.params;
    let { name, role, email, password } = req.body;
    if (!name || !role || !email || !password) throw new AppError(400, "All fields required");

    let userExist=await findUserByEmail(email);
    if(userExist){
        throw new AppError(409, "user already exists");
    }else{
        const user = new userCollection({
            name,
            email,
            role,
            password
        });

        await user.save();
        const token=createToken(user._id);
        res.status(201).json({
            created: true,
            email:user.email,
            token,
        });
    }
})

module.exports={
    register
}