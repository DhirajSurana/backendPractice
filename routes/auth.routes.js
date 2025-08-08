import { Router } from "express";
import authController from "../controllers/auth.controller.js";
import { registerUserMiddleware } from "../middlewares/registerUser.middleware.js";

export default Router().post(
  "/signUp",
  registerUserMiddleware,
  authController.signUp
);
// .post("/signIn", authController.loginUser)
// .post("/logout", authController.logoutUser);
