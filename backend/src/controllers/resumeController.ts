import Resume from "../models/Resume";
import { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { buildResumePrompt } from "../utils/buildResumePrompt";
import { formatResumeInput } from "../utils/formatResumeInput";
import { geminiGeneration } from "../utils/geminiGeneration";
import { normalizeResume } from "../utils/normalizeResume";

dotenv.config();

export const genResController = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const {
      name,
      email,
      phone,
      linkedin,
      experience,
      skills,
      education,
      projects,
      summary,
      template,
    } = req.body;

    if (!name || !email || !phone || !linkedin || !skills || !education) {
      res.status(400).json({ error: "Missing required fields" });
      return;
    }

    if (!req.userId) {
      res.status(401).json({ error: "Unauthorized request" });
      return;
    }

    const { formattedExperience, formattedEducation, formattedProjects } =
      formatResumeInput({ experience, education, projects });

    const userSummary = summary?.trim();

    const prompt = buildResumePrompt({
      name,
      skills,
      summary: userSummary,
    });

    let cleanSummary = userSummary;
    if (!cleanSummary?.length) {
      const isTestEnv = process.env.NODE_ENV === "test";
      if (isTestEnv) {
        cleanSummary = "Test Summary";
      } else if (process.env.GEMINI_API_KEY) {
        try {
          const aiSummary = await geminiGeneration({ prompt });
          cleanSummary = aiSummary?.trim() || "Passionate and results-driven professional.";
        } catch (e) {
          console.error("Gemini summary generation failed:", e);
          cleanSummary = "Passionate and results-driven professional.";
        }
      } else {
        console.warn("GEMINI_API_KEY is not configured. Falling back to default professional summary.");
        cleanSummary = "Passionate and results-driven professional.";
      }
    }

    const newResume = await Resume.create({
      userId: req.userId,
      template,
      name,
      email,
      phone,
      linkedin,
      summary: cleanSummary,
      experience: formattedExperience,
      skills,
      education: formattedEducation,
      projects: formattedProjects,
    });

    res.status(200).json(normalizeResume(newResume));
    return;
  } catch (error: any) {
    res.status(500).json({ error: error.message || "Internal Server Error" });
    return;
  }
};

export const getResController = async (req: Request, res: Response) => {
  try {
    const resumes = await Resume.find({ userId: req.userId });
    res.status(200).json(resumes.map(normalizeResume));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getSpecificController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ error: "Invalid resume ID" });
      return;
    }
    const resume = await Resume.findOne({ _id: id, userId: req.userId });
    if (!resume) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.status(200).json(normalizeResume(resume));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const delResController = async (req: Request, res: Response) => {
  try {
    const deleted = await Resume.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId,
    });

    if (!deleted) {
      res.status(404).json({ error: "Resume not found" });
      return;
    }
    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
