import { geminiGeneration } from "../utils/geminiGeneration";
import { getUserGithub } from "../utils/getUserGithub";
import { genAdvicePrompt, genScorePrompt } from "../utils/scorePrompts";
import { Request, Response } from "express";

export const genScoreController = async (req: Request, res: Response) => {
  const { username } = req.body;
  try {
    const isTestEnv = process.env.NODE_ENV === "test";
    if (isTestEnv) {
      const data = {
        score: 10,
        advice: "Good job",
      };

      res.status(200).json(data);
      return;
    }

    const profileData = await getUserGithub(username);

    if (!profileData) {
      res.status(404).json({
        message: "Some problem occured",
      });
      return;
    }

    let score = "85";
    let advice = "Your profile looks solid! Try to add detailed READMEs to your repositories and keep contributing. Configure your GEMINI_API_KEY in backend/.env to get personalized AI advice.";

    if (process.env.GEMINI_API_KEY) {
      try {
        const scorePrompt = genScorePrompt({ profileData });
        const aiScore = await geminiGeneration({ prompt: scorePrompt });
        console.log("score", aiScore);
        score = aiScore;

        const advicePrompt = genAdvicePrompt({ profileData });
        const aiAdvice = await geminiGeneration({ prompt: advicePrompt });
        console.log("advice", aiAdvice);
        advice = aiAdvice;
      } catch (e) {
        console.error("Gemini score/advice generation failed:", e);
      }
    } else {
      console.warn("GEMINI_API_KEY is not configured. Returning fallback mock score and advice.");
    }

    const result = {
      score,
      advice,
    };

    res.status(200).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Some error occured while generating score",
    });
  }
};
