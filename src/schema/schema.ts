import * as Yup from "yup";

export const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, "Tài khoản quá ngắn!")
    .max(50, "Too Long!")
    .required("Tên không được để trống"),
  password: Yup.string()
    .min(5, "Mật khẩu quá ngắn!")
    .required("Mật khẩu không được để trống."),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống."),
});

export const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(5, "Mật khẩu quá ngắn!")
    .required("Mật khẩu không được để trống."),
  email: Yup.string()
    .email("Email không hợp lệ")
    .required("Email không được để trống."),
});
