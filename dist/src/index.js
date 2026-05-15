"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const token_1 = __importDefault(require("./routes/token"));
const justify_1 = __importDefault(require("./routes/justify"));
const app = (0, express_1.default)();
exports.app = app;
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.text({ type: "text/plain" }));
app.use("/api/token", token_1.default);
app.use("/api/justify", justify_1.default);
const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
exports.server = server;
exports.default = app;
