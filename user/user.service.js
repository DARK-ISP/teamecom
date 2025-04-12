import { validateUserSignupData } from "./user.validation.js";

export const validateUser = async (req, res, next) => {
  const userData = req.body;

  try {
    await validateUserSignupData.validate(userData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  next();
};

export const signupUser = async (req, res) => {
  const userData = req.body;
  console.log(userData);
};
