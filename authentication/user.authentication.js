import jwt from "jsonwebtoken";
import { verifyJWT } from "../utils/jwt.js";
import User from "../user/user.model.js";

export const isSeller = async (req, res, next) => {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(400).json({ message: "Unauthorized. " });
  }

  const splitToken = authorization.split(" ");

  const token = splitToken[1];

  if (!token) {
    return res.status(400).json({ message: "Unauthorized. " });
  }

  let payload;

  try {
    payload = verifyJWT(token);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }

  const user = await User.findOne({ email: payload.data });

if(user.roles !=="seller")
{
    return res.status(400).json({message: "Unauthorized. "});
}

req.userData  = user;
req.userId = user._id;

next();
};



