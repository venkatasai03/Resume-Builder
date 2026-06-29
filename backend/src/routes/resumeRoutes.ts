import express from "express";
import { userMiddleware } from "../middlewares/userMiddleware";
import {
  delResController,
  genResController,
  getResController,
  getSpecificController,
} from "../controllers/resumeController";
import { validate } from "../middlewares/validateMiddleware";
import { resumeSchema } from "../validators/resumeSchema";

const router = express.Router();

router.post(
  "/generate",
  userMiddleware,
  validate(resumeSchema),
  genResController,
);

router.get("/", userMiddleware, getResController);

router.get("/:id", userMiddleware, getSpecificController);

router.delete("/:id", userMiddleware, delResController);

export default router;
