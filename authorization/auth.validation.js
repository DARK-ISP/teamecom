
import yup from "yup";

export const validateOtpEmail = yup.object({
    email: yup.string().required("email is required.").trim().lowercase().email("please enter a valid email. ")
})


