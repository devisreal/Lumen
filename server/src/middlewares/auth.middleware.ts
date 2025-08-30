import "dotenv/config";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";

const JWT_SECRET = process.env.JWT_SECRET!;

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let token = req.cookies?.access_token as string | undefined;

  if (!token && req.headers.authorization) {
    const [scheme, value] = req.headers.authorization.split(" ");
    if (scheme === "Bearer") token = value;
  }

  if (!token) {
    sendResponse(res, ResponseStatus.Error, "Not authenticated", null, 401);
    return;
  }

  try {
    const payload = jwt.verify(token, JWT_SECRET);
    (req as any).user = payload;

    return next();
  } catch {
    sendResponse(
      res,
      ResponseStatus.Error,
      "Invalid or expired token",
      null,
      403,
    );
    return;
  }
};

export default authMiddleware;
