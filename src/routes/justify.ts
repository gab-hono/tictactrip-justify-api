import { Router, Request, Response } from "express";
import { justify } from "../services/justify";
import { authMiddleware } from "../middleware/auth";
import { checkRateLimit, incrementWordCount } from "../services/rateLimitService";

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {

    const token = req.headers["authorization"]!.split(" ")[1];
    const text = req.body;

    if (typeof text !== "string" || text.trim().length === 0) {
        res.status(400).json({ error: "Body must be a non-empty text/plain string" });
        return;
    }

    /* Count words before justifying */
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;

    /* Check rate limit */
    if (!checkRateLimit(token)) {
        res.status(402).json({ error: "Daily word limit exceeded (80,000 words per day)" });
        return;
    }

    /* Increment usage and justify */
    incrementWordCount(token, wordCount);
    const result = justify(text);

    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(result);
});

export default router;
