import { User } from "../models/user.model.js";
import apiRespnose from "../utils/apiRespnose.js";
import { createAccessToken } from "../utils/createAccessToken.js";
import isValidPassword from "../utils/isValidPassword.js";

class authController {
  async signUp(req, res) {
    try {
      const accessToken = createAccessToken(req.user);

      if (!accessToken) {
        return apiRespnose.error(
          res,
          "Failed to create access token",
          null,
          500
        );
      }

      res.cookie("accessToken", accessToken);

      const newUser = await User.findById(req.user._id).select("-password");
      return apiRespnose.success(
        res,
        newUser,
        "User registered successfully",
        201
      );
    } catch (error) {
      return apiRespnose.error(res, "Internal server error", error, 500);
    }
  }

  async signIn(req, res) {
    const { userName, email, password } = req.body;
    const existingUser = await User.findOne({
      $or: [{ userName }, { email }],
    });

    if (!existingUser) {
      return apiRespnose.error(res, "User not found", null, 404);
    }

    const isPasswordValid = await isValidPassword(
      password,
      existingUser.password
    );

    if (!isPasswordValid) {
      return apiRespnose.error(res, "Invalid credentials", null, 401);
    }
    const accessToken = createAccessToken(
      await User.findById(existingUser._id).select("-password -workingAt")
    );

    if (!accessToken) {
      return apiRespnose.error(res, "Failed to create access token", null, 500);
    }

    res.cookie("accessToken", accessToken);

    return apiRespnose.success(
      res,
      await User.findById(existingUser._id).select("-password"),
      "User logged in successfully",
      200
    );
  }

  async logOut(req, res) {
    try {
      res.clearCookie("accessToken");
      return apiRespnose.success(
        res,
        null,
        "User logged out successfully",
        200
      );
    } catch (error) {
      return apiRespnose.error(res, "Internal server error", error, 500);
    }
  }
}

export default new authController();
