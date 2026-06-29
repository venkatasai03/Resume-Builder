import express from "express";
import { userMiddleware } from "../middlewares/userMiddleware";
import {
  getProfileController,
  updateProfileController,
} from "../controllers/profileController";

const router = express.Router();

router.get("/", userMiddleware, getProfileController);

router.put("/update", userMiddleware, updateProfileController);

export default router;
