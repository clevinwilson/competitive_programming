const questionCollection = require('../../model/questionModel')

module.exports = questionHelper = {
    addQuestion: async (userId, data) => {
        const newQuestion = new questionCollection({
            user: userId,
            title: data.title,
            description: data.description,
            inputFormat: data.inputFormat,
            outputFormat: data.outputFormat,
            sampleInput: data.sampleInput,
            sampleOutput: data.sampleOutput,
            testCases: data.testCases
        })
        return await newQuestion.save()
    },
    editQuestion: async (userId, questionId, data) => {
        let editQuestion = await questionCollection.updateOne({ _id: questionId, user: userId }, {
            $set: {
                user: userId,
                title: data.title,
                description: data.description,
                inputFormat: data.inputFormat,
                outputFormat: data.outputFormat,
                sampleInput: data.sampleInput,
                sampleOutput: data.sampleOutput,
                testCases: data.testCases
            }
        })
        return editQuestion;
    },
    deleteQuestion:async(userId,questionId)=>{
        let deleteQuestion=await questionCollection.deleteOne({_id:questionId,user:userId});
        return deleteQuestion;
    },
    addTestCase: async (userId, questionId, newTestCase)=>{
        let editQuestion = await questionCollection.updateOne({ _id: questionId, user: userId }, { $push: { testCases: newTestCase }});
        return editQuestion;

    }
}