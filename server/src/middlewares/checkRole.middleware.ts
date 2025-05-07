import { Response, NextFunction } from "express";

import { UserRole } from "@/types/roles";
import { AuthenticatedRequest } from "@/types/auth";

export function checkRoles(...allowedRoles: UserRole[]) {
  return (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    const user = req.token;

    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      res.status(403).json({ message: "Forbidden: insufficient permissions" });
      return;
    }

    next();
  };
}
