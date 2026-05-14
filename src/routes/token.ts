import { Request, Response, Router } from "express";
import { generateToken } from "../services/tokenService";

const router = Router();

router.post("/", (req: Request, res: Response) => {
    const { email } = req.body;

    if(!email || typeof email !== "string") {
        res.status(400).json({ error: "Valid email is required" });
        return;
    }

    const token = generateToken(email);
    res.status(200).json({ token });
});

export default router;