const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "User name is required"],
        },
        email: {
            type: String,
            required: [true, "Email name is required"],
            unique: true
        },
        role: {
            type: String,
            required: [true, "Role is required"],
        },
        password: {
            type: String,
            required: [true, "Password is required"]
        }
    },
    { timestamps: true }
)

userSchema.pre("save", async function (next) {
    this.password = await bcrypt.hash(this.password, 10);

})

module.exports = mongoose.model("Users", userSchema);