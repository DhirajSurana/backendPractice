import { User } from "../models/user.model.js";
import ApiRespnose from "../utils/apiRespnose.js";

const registerUserMiddleware = async (req, res, next) => {
  try {
    const { userName, email, password, role } = req.body;
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return ApiRespnose.error(res, "User already exists", null, 400);
    }

    // Create new user
    const newUser = await User.create({
      userName,
      email,
      password,
      role: role || "user",
    });

    if (!newUser) {
      return ApiRespnose.error(res, "Failed to create user", null, 500);
    }

    req.user = newUser;

    next();
  } catch (error) {
    return ApiRespnose.error(res, "Internal server error", error, 500);
  }
};

export { registerUserMiddleware };
