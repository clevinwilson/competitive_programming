const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const createToken = require('../utils/tokenGenerator');

//signup
const register = expressAsyncHandler(async (req, res) => {
    const { phone } = req.params;
    let { fname, lname, email, password } = req.body;
    if (!fname || !lname || !email || !password) throw new AppError(400, "All fields required");
    if (!phone) throw new AppError(400, "phone number is required");
    const user = await db.get().collection(collection.USER_COLLECTION).findOne({ phone: phone, verify: true });
    if (!user) throw new AppError(400, "phone number is not related to any account")

    const userExist = await db.get().collection(collection.USER_COLLECTION).findOne({ email: email })
    if (userExist) throw new AppError(400, "Email already exists ");

    bcrypt.hash(password, 10, function (err, hash) {
        password = hash;
        db.get().collection(collection.USER_COLLECTION).updateOne({ phone: phone }, {
            $set: {
                fname,
            }
        }).then((response) => {
            res.json({
                success: true,
            });
        })
    });
})

module.exports={
    register
}