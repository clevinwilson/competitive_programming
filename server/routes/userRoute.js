const express=require('express');
const { register } = require('../controller/userContoller');
const { validateBody } = require('../utils/validateBody.js');
const { userSchema } = require('../middleware/yupSchema');
const router=express.Router();

//signup
router.post('/register',validateBody(userSchema),register);


module.exports = router;