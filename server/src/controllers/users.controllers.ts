import { db } from "@/db";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { eq as equals } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userInsertSchema, users } from "@/db/schema";
import { checkExistingUser, generateSlug } from "@/utils/helpers";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { JwtPayload } from "@/types/auth";
import { UserRoles } from "@/types/roles";
import { InsertUserModel, SelectUserModel } from "@/types/schemaTypes";

export const getAllUsers = async (_req: Request, res: Response) => {
  const result: SelectUserModel[] = await db.select().from(users);
  sendResponse(res, ResponseStatus.Success, "Success", result);
};

export const getUser = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const [user] = await db
      .select()
      .from(users)
      .where(equals(users.slug, String(slug)));

    const { password, ...result } = user;

    if (!result) {
      sendResponse(res, ResponseStatus.Error, "User not found", null, 400);
    }

    sendResponse(res, ResponseStatus.Success, "Success", result);
  } catch (error) {
    console.log(error);
    sendResponse(res, ResponseStatus.Error, "An error occured", error, 500);
  }
};
