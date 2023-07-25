const express=require('express');
const { register, doLogin } = require('../controller/authController');
const { validateBody } = require('../utils/validateBody.js');
const { validate_id }=require('../utils/validateId');
const { userSchema, questionSchema, testCase } = require('../middleware/yupSchema');
const { addQuestion, getQuestionDetails, editQuestion, deleteQuestion, addTestCase, getAllQuestions } = require('../controller/questionController');
const { verifyAdminLogin }=require('../middleware/authAdmin');
const { verifyUserLogin }=require('../middleware/authUser');
const { submitCode } = require('../controller/userController');
const router=express.Router();

//APIs signup and login
router.post('/register',validateBody(userSchema),register);
router.post('/login',doLogin);

//APIs for Questions
router.route('/question').post(verifyAdminLogin,validateBody(questionSchema), addQuestion).get(getAllQuestions)
router.route('/question/:id')
        .get(validate_id,getQuestionDetails)
        .put(verifyAdminLogin,validate_id,validateBody(questionSchema),editQuestion)
        .delete(verifyAdminLogin,validate_id,deleteQuestion);

//APIs testcases
router.route('/test-case/:id').patch(verifyAdminLogin,validate_id,validateBody(testCase),addTestCase);

//code submit
router.post('/submit-solution',verifyUserLogin,submitCode)

module.exports = router;