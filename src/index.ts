import express from "express";
import tokenRouter from "./routes/token";
import justifyRouter from "./routes/justify";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.text({ type: "text/plain" }));

app.use("/api/token", tokenRouter);
app.use("/api/justify", justifyRouter);

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export { app, server };
export default app;