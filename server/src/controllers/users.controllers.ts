import { db } from "@/db";
import "dotenv/config";
import { eq as equals } from "drizzle-orm";
import { Request, Response } from "express";
import { users } from "@/db/schema";
import { findUserBySlug, updateUserStatus } from "@/utils/helpers";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { AuthenticatedRequest } from "@/types/auth";
import { UserRoles } from "@/types/roles";
import { SelectUserModel } from "@/types/schemaTypes";

export const getAllUsers = async (_req: Request, res: Response) => {
  const result = await db
    .select({
      id: users.id,
      userName: users.userName,
      firstName: users.firstName,
      lastName: users.lastName,
      email: users.email,
      slug: users.slug,
      role: users.role,
      status: users.status,
      createdAt: users.created_at,
      updatedAt: users.updated_at,
    })
    .from(users);
  sendResponse(res, ResponseStatus.Success, "Success", result);
};

export const getUser = async (req: Request, res: Response) => {
  const slug = req.params.slug;
  try {
    const [user]: SelectUserModel[] = await db
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

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await findUserBySlug(req.params.slug);
    if (!user) {
      sendResponse(res, ResponseStatus.Success, "User not found", null, 400);
      return;
    }

    const isOwner = req.token.slug === user.slug;
    const isAdmin = req.token.role === UserRoles.Admin;
    const isModerator = req.token.role === UserRoles.Moderator;

    if (!(isOwner || isAdmin || isModerator)) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "Forbidden: insufficient permissions",
        null,
        403,
      );
      return;
    }

    const result = await updateUserStatus(user.slug, "deactivated");
    

    sendResponse(
      res,
      ResponseStatus.Success,
      "User deleted successfully",
      result,
    );
    return;
  } catch (error) {
    console.log(error);
    sendResponse(res, ResponseStatus.Error, "An error occured", error, 500);
  }
};
