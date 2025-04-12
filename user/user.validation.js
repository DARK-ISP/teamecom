import yup from "yup";
export const validateUserSignupData = yup.object({
  firstName: yup
    .string()
    .required("First name is required!! ")
    .max(30, "Maximum character limit is 30!!")
    .trim(),

  lastName: yup
    .string()
    .required("Last name is required. ")
    .trim()
    .max(30, "Maximum character limit is 30"),

  email: yup
    .string()
    .required("Email is required. ")
    .email("Enter valid email. ")
    .lowercase()
    .max(320, "Email must be less than or equal to 320 characters. "),
  password: yup
    .string()
    .required("Password Is Required.")
    .min(6, "Password must be at least 6 characters long.")
    .matches(/[0-9]/, "Password must contain a number.")
    .matches(/[a-zA-Z]/, "Password must contain a letter.")
    .matches(/[!@#$%^&*()_+<>?]/, "Password must contain a special character."),

  role: yup
    .string()
    .trim()
    .default("buyer")
    .oneOf(["buyer", "seller"], "Invalid role. choose either buyer or seller"),
});

export const validateUserLoginData = yup.object({
  email: yup
    .string()
    .required("Email is required. ")
    .email("Enter valid email.")
    .trim()
    .lowercase(),
  password: yup.string().required("Password is required. "),
});
