import { profileSchema } from "../validators/profileSchema";
import { Request, Response } from "express";
import User from "../models/User";

export const getProfileController = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      res.status(404).json({ error: "No user exists of this name" });
      return;
    }
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateProfileController = async (req: Request, res: Response) => {
  try {
    const validatedData = profileSchema.parse(req.body);

    const updatedUser = await User.findByIdAndUpdate(
      req.userId,
      validatedData,
      { new: true },
    ).select("-password");

    if (!updatedUser) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (error: any) {
    if (error.name === "ZodError") {
      res.status(400).json({ errors: error.errors });
      return;
    }
    res.status(500).json({ error: error.message });
  }
};
