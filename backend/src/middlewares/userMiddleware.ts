import { NextFunction, Response,Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const userMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  try {
    const header = req.header("Authorization");

    if (!header || !header.startsWith("Bearer ")) {
      res.status(403).json({ message: "Missing or invalid token" });
      return;
    }

    const token = header.split(" ")[1]; 

    if (!process.env.JWT_SECRET) {
      res.status(500).json({ message: "JWT Secret is missing" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
    req.userId = decoded.userId;
    next(); 
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};






