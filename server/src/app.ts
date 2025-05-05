import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import { errorHandler } from "@/middlewares/errorHandler";
import { sendResponse } from "./utils/sendResponse";
import { ResponseStatus } from "./@types/apiResponse";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
  }),
);

app.get("/", async (_req: Request, res: Response) => {
  sendResponse(res, ResponseStatus.Success, "Welcome Lumen");
});

app.use(errorHandler);

export default app;
