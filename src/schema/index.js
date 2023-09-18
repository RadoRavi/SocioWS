import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;



export const loginSchema = yup.object().shape({
    email:yup.string().email("Please enter valid email").required("Email Required"),
    password:yup.string().min(5,).matches(passwordRules,"Password is weak").required("Password Required")
})

export const registerSchema = yup.object().shape({
    firstName:yup.string("Name should be text, not number").min(2,"Minimum two characters required").required("First name required"),
    lastName:yup.string("Name should be text, not number").min(2,"Minimum two characters required").required("Last name required"),
    password:yup.string().min(5,).matches(passwordRules,"Password is weak").required("Password Required"),
    location:yup.string("Location should be text, not number").required("Location required"),
    occupation:yup.string("Occupation should be text, not number").min(5).required("Job details required"),
    email:yup.string().email("Please enter valid email").required("Email Required")
})