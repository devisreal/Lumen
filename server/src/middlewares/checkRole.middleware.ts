import { NextFunction, Response } from "express";
import { AuthenticatedRequest } from "@/types/auth";
import { UserRole } from "@/types/roles";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";

export function checkRoles(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.token;

    if (!user) {
      sendResponse(res, ResponseStatus.Error, "Unathorized", null, 401)
      return;
    }
    
    if (!allowedRoles.includes(user.role)) {
      sendResponse(res, ResponseStatus.Error,"Forbidden: insufficient permissions", null, 403)
      
      return;
    }

    next();
  };
}
