const yup = require('yup');

// user registration
const userSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required("Please provide fullname")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    email: yup
        .string()
        .email()
        .required("email is required"),
    password:yup
        .string()
        // .min(8, 'Password must be at least 8 characters long')
        // .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        // .matches(/\d/, 'Password must contain at least one digit')
        .required('Password is required'),
    role:yup
        .string()
        .oneOf(['user', 'admin'], 'Role must be either "user" or "admin"')
        .required('role is required')
});

const questionSchema = yup.object().shape({
    title: yup
        .string()
        .trim()
        .required("Please provide title")
        .matches(/^[a-zA-Z\s]+$/, "Only alphabets are allowed"),
    description: yup
        .string()
        .required("description is required"),
    inputFormat: yup
        .string()
        .required('inputFormat is required'),
    outputFormat: yup
        .string()
        .required('outputFormat is required'),
    sampleInput: yup
        .string()
        .required('sampleInput is required'),
    sampleOutput: yup
        .string()
        .required('sampleOutput is required'),
    testCases: yup
        .array()
});

const testCase = yup.object().shape({
    input: yup
        .string()
        .required("Please provide input"),
    output: yup
        .string()
        .required("description is required"),

});


module.exports = {
    userSchema,
    questionSchema,
    testCase
}