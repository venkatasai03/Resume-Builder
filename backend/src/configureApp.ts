import express from "express";
import cors from "cors";
import morgan from "morgan";
import authRoutes from "./routes/authRoutes";
import resumeRoutes from "./routes/resumeRoutes";
import profileRoutes from "./routes/profileRoutes";
import scoreRoutes from "./routes/scoreRoutes";

export default function configureApp() {
  const app = express();

  app.use(
    cors({
      origin: process.env.REACT_APP_URL,
      credentials: true,
    }),
  );

  app.use(morgan("dev"));
  app.use(express.json());

  app.use("/api/auth", authRoutes);
  app.use("/api/resumes", resumeRoutes);
  app.use("/api/profile", profileRoutes);
  app.use("/api/score", scoreRoutes);

  return app;
}
