import * as Yup from "yup";
import { passwordRegex } from "../regex/regex";

export const SignInSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      passwordRegex,
      "Password must contain at least 8 characters in lower and uppercase and at least one special character"
    ),
});
