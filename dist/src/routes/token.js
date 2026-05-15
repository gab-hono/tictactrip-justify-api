"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const tokenService_1 = require("../services/tokenService");
const router = (0, express_1.Router)();
router.post("/", (req, res) => {
    const { email } = req.body;
    if (!email || typeof email !== "string") {
        res.status(400).json({ error: "Valid email is required" });
        return;
    }
    const token = (0, tokenService_1.generateToken)(email);
    res.status(200).json({ token });
});
exports.default = router;
