import { User } from "../models/user.model.js";
import ApiRespnose from "../utils/apiRespnose.js";
import createHashPasswrod from "../utils/createHashPasswrod.js";

const registerUserMiddleware = async (req, res, next) => {
  try {
    const { userName, email, password, role } = req.body;
    const existingUser = await User.findOne({ userName });

    if (existingUser) {
      return ApiRespnose.error(res, "User already exists", null, 400);
    }

    const hashPassword = await createHashPasswrod(password);
    if (!hashPassword) {
      return ApiRespnose.error(res, "Failed to hash password", null, 500);
    }

    // Create new user
    const newUser = await User.create({
      userName,
      email,
      password: hashPassword,
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
