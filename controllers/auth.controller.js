import apiRespnose from "../utils/apiRespnose.js";
import { createAccessToken } from "../utils/createAccessToken.js";
import { User } from "../models/user.model.js";

class authController {
  async signUp(req, res) {
    try {
      const accessToken = await createAccessToken(req.user);

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
}

export default new authController();
