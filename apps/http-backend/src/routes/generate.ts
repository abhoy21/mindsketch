import { Response, Router } from "express";
import { AuthReqProps } from "../middleware";
import run from "../ai-draw";

const router: Router = Router();

interface GenerateProps extends AuthReqProps {
  body: {
    prompt: string;
  };
}

router.post("/generate-diagram", async (req: GenerateProps, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    const prompt = req.body.prompt;
    console.log("Prompt: ", prompt);
    if (!prompt) {
      res.status(400).json({ message: "Invalid prompt" });
      return;
    }

    const ai_response = await run(prompt);
    console.log("Ai response: \n", ai_response);
    const response = ai_response
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .replace(/\n/g, "")
      .trim();
    res.status(200).json({ message: "Diagram Generated", response });
  } catch (error) {
    res.status(500).json({ message: "Error Generating Diagram" });
  }
});

export const useGenerate: Router = router;
