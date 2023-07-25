const mongoose = require('mongoose');
const { number } = require('yup');

const questionSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "title name is required"],
        },
        description: {
            type: String,
            required: [true, "description name is required"]
        },
        inputFormat: {
            type: String,
            required: [true, "inputFormat is required"],
        },
        outputFormat: {
            type: String,
            required: [true, "outputFormat is required"]
        },
        sampleInput: {
            type: String,
            required: [true, "sampleInput is required"]
        },
        sampleOutput: {
            type: String,
            required: [true, "sampleOutput is required"]
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
        },
        testCases: {
            type: [Object]
        }
    },
    { timestamps: true }
)

module.exports = mongoose.model("Questions", questionSchema);