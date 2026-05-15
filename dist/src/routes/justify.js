"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const justify_1 = require("../services/justify");
const auth_1 = require("../middleware/auth");
const rateLimitService_1 = require("../services/rateLimitService");
const router = (0, express_1.Router)();
router.post("/", auth_1.authMiddleware, (req, res) => {
    const token = req.headers["authorization"].split(" ")[1];
    const text = req.body;
    if (typeof text !== "string" || text.trim().length === 0) {
        res.status(400).json({ error: "Body must be a non-empty text/plain string" });
        return;
    }
    /* Count words before justifying */
    const wordCount = text.split(/\s+/).filter(w => w.length > 0).length;
    /* Check rate limit */
    if (!(0, rateLimitService_1.checkRateLimit)(token)) {
        res.status(402).json({ error: "Daily word limit exceeded (80,000 words per day)" });
        return;
    }
    /* Increment usage and justify */
    (0, rateLimitService_1.incrementWordCount)(token, wordCount);
    const result = (0, justify_1.justify)(text);
    res.setHeader("Content-Type", "text/plain");
    res.status(200).send(result);
});
exports.default = router;
