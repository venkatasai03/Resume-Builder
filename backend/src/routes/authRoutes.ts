import express from "express";
import { validate } from "../middlewares/validateMiddleware";
import { loginSchema, registerSchema } from "../validators/authSchema";
import {
  googleLogin,
  loginController,
  registerController,
} from "../controllers/authController";

const router = express.Router();

router.post("/register", validate(registerSchema), registerController);

router.post("/login", validate(loginSchema), loginController);

router.post("/google", googleLogin);

export default router;
