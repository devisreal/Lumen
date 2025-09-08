import { NextFunction, Request, RequestHandler, Response } from "express";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { UserRole } from "@/types/userRoles";

export function checkRoles(...allowedRoles: UserRole[]): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user) {
      sendResponse(res, ResponseStatus.Error, "Unathorized", null, 401);
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "Forbidden: insufficient permissions",
        null,
        403,
      );

      return;
    }

    next();
  };
}
