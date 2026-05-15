"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateToken = generateToken;
exports.isValidToken = isValidToken;
const crypto_1 = __importDefault(require("crypto"));
const tokenStore = new Map();
function generateToken(email) {
    const token = crypto_1.default.randomBytes(32).toString("hex");
    tokenStore.set(email, token);
    return token;
}
function isValidToken(token) {
    for (const storedToken of tokenStore.values()) {
        if (storedToken === token)
            return true;
    }
    return false;
}
