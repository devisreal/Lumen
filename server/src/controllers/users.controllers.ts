import { db } from "@/db";
import "dotenv/config";
import { eq as equals } from "drizzle-orm";
import { Request, RequestHandler, Response } from "express";
import { users } from "@/db/schema";
import { findUserBySlug, updateUserStatus } from "@/utils/helpers";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { SelectUserModel } from "@/types/user";
import { UserRoles } from "@/types/user";

export const getAllUsers: RequestHandler = async (
  _req: Request,
  res: Response,
) => {
  const result = await db
    .select({
      id: users.id,
      username: users.username,
      firstname: users.firstname,
      lastname: users.lastname,
      email: users.email,
      slug: users.slug,
      role: users.role,
      status: users.status,
      createdAt: users.created_at,
      updatedAt: users.updated_at,
    })
    .from(users);

  sendResponse(res, ResponseStatus.Success, "Success", result);
  return;
};

export const getUser: RequestHandler = async (req: Request, res: Response) => {
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
    return;
  }
};

export const deleteUser: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const user = await findUserBySlug(req.params.slug);
    if (!user) {
      sendResponse(res, ResponseStatus.Success, "User not found", null, 400);
      return;
    }

    const isOwner = (req as any).user.slug === user.slug;
    const isAdmin = (req as any).user.role === UserRoles.Admin;
    const isModerator = (req as any).user.role === UserRoles.Moderator;

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
    return;
  }
};
