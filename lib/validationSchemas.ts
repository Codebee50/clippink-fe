import * as yup from "yup"


const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;


export const loginSchema = yup.object().shape({
    password: yup.string().required("This field is required"),
  
    email: yup.string().email("Please provide a valid email address"),
  });


export const registrationSchema = yup.object().shape({
    password: yup
      .string()
      .min(5)
      .matches(passwordRules, { message: "Password is not strong enough" })
      .required("This field is required"),
  
    email: yup
      .string()
      .email("Please provide a valid email address")
      .required("This field is required"),
    name: yup.string().required("This field is required").min(3, "Username must be at least 3 characters long"),
});
