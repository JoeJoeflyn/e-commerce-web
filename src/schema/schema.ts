import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Your Username too short!")
    .max(50, "Your Username too Long!")
    .required("Username is required!"),
  password: Yup.string()
    .min(5, "Your password too short!")
    .required("Password is required!"),
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Your password too short!")
    .required("Password is required!"),
  email: Yup.string().email("Email is invalid!").required("Email is required!"),
});
