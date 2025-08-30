import * as yup from "yup";
import YupPassword from "yup-password";

YupPassword(yup);

export const loginFormSchema = yup
  .object()
  .shape({
    username: yup.string().required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      // .password()
      .min(6, "Password must be 6 characters or more"),
  })
  .required();

export const registerFormSchema = yup
  .object()
  .shape({
    username: yup.string().required("This field is required"),
    email: yup
      .string()
      .email("Enter a valid email")
      .required("This field is required"),
    password: yup
      .string()
      .required("This field is required")
      // .password()
      .min(6, "Password must be 6 characters or more"),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), "null"], "Passwords must match")
      .required("This field is required"),
  })
  .required();
