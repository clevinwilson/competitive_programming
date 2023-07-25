const expressAsyncHandler = require("express-async-handler");
const AppError = require("../utils/error");
const questionHelper = require("../helper/question/questionHelper");

const submitCode=expressAsyncHandler(async(req,res)=>{
    const { questionId, code, language } = req.body;
    if (!questionId || !code || !language) throw new AppError(400, "bad request")
    const submissionData = {
        compilerId: 56,
        source: code,
    };

    let status=await questionHelper.submitCode(submissionData);
    if (!status) throw new AppError(400, "error occured while submiting  code");
    res.json({status})

})

module.exports={
    submitCode
}