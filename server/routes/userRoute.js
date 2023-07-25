const express=require('express');
const { register, doLogin } = require('../controller/userController');
const { validateBody } = require('../utils/validateBody.js');
const { validate_id }=require('../utils/validateId');
const { userSchema, questionSchema, testCase } = require('../middleware/yupSchema');
const { addQuestion, getQuestionDetails, editQuestion, deleteQuestion, addTestCase } = require('../controller/questionController');
const { verifyAdminLogin }=require('../middleware/authAdmin')
const router=express.Router();

//APIs signup and login
router.post('/register',validateBody(userSchema),register);
router.post('/login',doLogin);

//APIs for Questions
router.post('/question',verifyAdminLogin,validateBody(questionSchema), addQuestion);
router.route('/question/:id')
        .get(validate_id,getQuestionDetails)
        .put(verifyAdminLogin,validate_id,validateBody(questionSchema),editQuestion)
        .delete(verifyAdminLogin,validate_id,deleteQuestion);

//APIs testcases
router.route('/test-case/:id').patch(verifyAdminLogin,validate_id,validateBody(testCase),addTestCase);

module.exports = router;