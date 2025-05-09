import yup from "yup"
export const cartValidation = yup.object({
    productId : yup.string().required("Product id is required!").trim(),
    quantity : yup.number().required("order quantity is required!").positive("quantity must be at least 1.!")
});

export const cartQuantityUpdateValidity = yup.object({
    productId:  yup.string().required("Product id is required!").trim(),
    action: yup.string().oneOf(["inc","dec"]).required("action is required")
})

export const cartIncValidate = yup.object({
    productId : yup.string().required("Product id is required!").trim(),
   
});


