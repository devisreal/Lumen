import { Request, Response } from "express";
import { ResponseStatus } from "@/types/apiResponse";
import { sendResponse } from "@/utils/sendResponse";
import { db } from "@/db";
import { users } from "@/db/schema";

export const getUsersController = async (req: Request, res: Response) => {
  const result = await db.select().from(users);
  sendResponse(res, ResponseStatus.Success, "Success", result);
};
