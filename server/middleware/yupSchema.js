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
        .min(8, 'Password must be at least 8 characters long')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/\d/, 'Password must contain at least one digit')
        .required('Password is required'),
    role:yup
        .string()
        .required('role is required')
});

module.exports = {
    userSchema
}