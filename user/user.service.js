import User from "./user.model.js";
import {
  validateUserLoginData,
  validateUserSignupData,
} from "./user.validation.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { generateJWT, verifyJWT } from "../utils/jwt.js";

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
  try {
    //check account existence

    const user = await User.findOne({ email: userData.email });

    if (user) {
      return res
        .status(400)
        .json({ message: "User already exist with this email. " });
    }

    //password hash
    const hashPassword = await bcrypt.hash(userData.password, 10);
    //replace hash value with actual password
    userData.password = hashPassword;

    await User.create(userData);
    return res.status(200).json({ message: "Account created. " });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong. " });
  }
};

//login functions

export const loginDataValidation = async (req, res, next) => {
  const userData = req.body;

  try {
    await validateUserLoginData.validate(userData);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

export const loginUser = async (req, res) => {
  const userData = req.body;

  try {
    const user = await User.findOne({ email: userData.email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credential" });
    }
    const decryptPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!decryptPassword) {
      return res.status(400).json({ message: "Invalid Credential" });
    }

    const payload = user.email;

    const token = await generateJWT(payload);

    user.password = undefined;

    return res.status(200).json({ user, token: token });
  } catch (error) {
    return res.status(400).json({ message: "Something went wrong. " });
  }
};

