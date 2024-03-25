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

export const ProductSchema = Yup.object().shape({
  category: Yup.string().required("Category is required!"),
  name: Yup.string()
    .max(50, "Your Product name too Long!")
    .required("Product name is required!"),
  description: Yup.string().required("Description is required!"),
  price: Yup.string().required("Price is required!"),
  discount: Yup.string().required("Discount is required!"),
  quantity: Yup.string().required("Quantity is required!"),
  contact: Yup.string().required("Contact is required!"),
  location: Yup.string().required("Location is required!"),
});
