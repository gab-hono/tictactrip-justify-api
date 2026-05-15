"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const tokenService_1 = require("../services/tokenService");
function authMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({ error: "Missing or invalid authorization header" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!(0, tokenService_1.isValidToken)(token)) {
        res.status(401).json({ error: "invalid token" });
        return;
    }
    next();
}
