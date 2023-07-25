const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const questionHelper = require("../helper/question/questionHelper");

const addQuestion = expressAsyncHandler(async (req, res) => {
    const data = req.body
    const userId = req.userId;

    if (!userId) throw new AppError(400, "bad request");
    const status = await questionHelper.addQuestion(userId, data);

    if (!status) throw Error("error occured while adding question");
    res.json({ status: true })
})

const getQuestionDetails=expressAsyncHandler(async(req,res)=>{
    const {id}=req.params;
    if (!id) throw new AppError(400, "bad request");
    const result=await questionHelper.getQuestionDetails(id);
    res.json({result})
})

const editQuestion=expressAsyncHandler(async(req,res)=>{
    const data=req.body;
    const questionId=req.params.id;
    const userId=req.userId;
    if (!userId || !questionId) throw new AppError(400, "bad request");

    const status = await questionHelper.editQuestion(userId,questionId, data);
    if (!status) throw Error("error occured while adding question");
    res.json({ status: true })
})

const deleteQuestion=expressAsyncHandler(async(req,res)=>{
    const questionId = req.params.id;
    const userId = req.userId;
    if (!userId || !questionId) throw new AppError(400, "bad request");
    const status = await questionHelper.deleteQuestion(userId, questionId);
    if (!status) throw Error("error occured while adding question");
    res.json({ status: true })
})

const addTestCase=expressAsyncHandler(async(req,res)=>{
    const newTestCase = req.body;
    const questionId = req.params.id;
    const userId = req.userId;

    console.log(newTestCase,questionId,userId);
    if (!newTestCase ||!userId || !questionId) throw new AppError(400, "bad request");
    const status = await questionHelper.addTestCase(userId, questionId, newTestCase);
    if (!status) throw Error("error occured while adding question");
    res.json({ status: true })
})

module.exports = {
    addQuestion,
    getQuestionDetails,
    editQuestion,
    deleteQuestion,
    addTestCase
}