import { Request } from "express";
import { JwtPayload as IJwtPayload } from "jsonwebtoken";

export type JwtPayload = {
  id: number;
  email: string;
  slug: string;
  role: string;
};

export interface AuthenticatedRequest extends Request {
  token?: any;
}
