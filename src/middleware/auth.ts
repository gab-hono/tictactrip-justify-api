import { NextFunction, Request, Response } from "express";
import { isValidToken } from "../services/tokenService";

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid authorization header" });
        return
    }

    const token = authHeader.split(" ")[1];

    if (!isValidToken(token)) {
        res.status(401).json({ error: "invalid token" })
        return;
    }

    next();
}