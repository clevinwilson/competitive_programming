const express=require('express');
const { register, doLogin } = require('../controller/userController');
const { validateBody } = require('../utils/validateBody.js');
const { validate_id }=require('../utils/validateId');
const { userSchema, questionSchema } = require('../middleware/yupSchema');
const { addQuestion, editQuestion, deleteQuestion } = require('../controller/questionController');
const { verifyAdminLogin }=require('../middleware/authAdmin')
const router=express.Router();

//signup and login
router.post('/register',validateBody(userSchema),register);
router.post('/login',doLogin);

//APIs for Questions
router.post('/question',verifyAdminLogin,validateBody(questionSchema), addQuestion);
router.route('/question/:id').put(verifyAdminLogin,validate_id,validateBody(questionSchema),editQuestion).delete(verifyAdminLogin,validate_id,deleteQuestion)


module.exports = router;