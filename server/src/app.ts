import cors from "cors";
import "dotenv/config";
import express, { Express, Request, Response } from "express";
import authRoutes from "@/routes/auth.routes";
import userRoutes from "@/routes/users.routes";
import { errorHandler } from "@/middlewares/errorHandler.middleware";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";

const app: Express = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.get("/", async (_req: Request, res: Response) => {
  sendResponse(res, ResponseStatus.Success, "Welcome Lumen");
});

// * routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);

// * middlewares
app.use(errorHandler);

export default app;
