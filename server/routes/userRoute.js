const express=require('express');
const { register, doLogin } = require('../controller/userContoller');
const { validateBody } = require('../utils/validateBody.js');
const { userSchema } = require('../middleware/yupSchema');
const router=express.Router();

//signup
router.post('/register',validateBody(userSchema),register);
router.post('/login',doLogin)


module.exports = router;