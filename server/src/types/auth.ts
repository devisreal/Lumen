import { Request } from "express";
import { JwtPayload as IJwtPayload } from "jsonwebtoken";

export type JwtPayload = {
  sub: string;
  email: string;
  slug: string;
  role: string;
  iss: string;
  aud: string;
  iat?: number;
  exp?: number;
};
