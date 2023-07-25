const userCollection = require('../../model/userModel')

module.exports = {
    findUserByEmail: async (email) => {
        const userData = await userCollection.findOne({ email: email })
        return userData;
    }
}