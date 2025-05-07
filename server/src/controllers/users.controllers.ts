import { Request, Response } from "express";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt, { Jwt } from "jsonwebtoken";
import { ResponseStatus } from "@/types/apiResponse";
import { sendResponse } from "@/utils/sendResponse";
import { db } from "@/db";
import { users } from "@/db/schema";
import { checkExistingUser, generateSlug } from "@/utils/helpers";
import { UserRoles } from "@/types/roles";
import { SelectUser } from "@/types/schemaTypes";

const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

export const getUsersController = async (_req: Request, res: Response) => {
  const result: SelectUser[] = await db.select().from(users);
  sendResponse(res, ResponseStatus.Success, "Success", result);
};

export const createNewuser = async (req: Request, res: Response) => {
  const formData = req.body;
  const slug: string = generateSlug(formData.userName);

  try {
    const userExists = await checkExistingUser(
      formData.userName,
      formData.email,
    );

    if (userExists) {
      return sendResponse(
        res,
        ResponseStatus.Error,
        "User with this username or email already exists.",
        {},
        409,
      );
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(formData.password, salt);
    const result: SelectUser[] = await db
      .insert(users)
      .values({
        userName: formData.userName,
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: hashedPassword,
        slug: slug,
        role: UserRoles.User,
        updated_at: new Date(),
      })
      .returning();

    const insertedUser = result[0];

    if (!insertedUser) {
      return sendResponse(
        res,
        ResponseStatus.Fail,
        "User insert failed",
        null,
        500,
      );
    }

    const token = jwt.sign(
      {
        id: insertedUser.id,
        email: insertedUser.email,
        slug: insertedUser.slug,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "8h" },
    );

    sendResponse(
      res,
      ResponseStatus.Success,
      "Account created successfully!, login to continue",
      {
        authToken: token,
      },
    );
  } catch (error) {
    console.log(error);

    sendResponse(res, ResponseStatus.Error, "An error occured", error, 500);
  }
};
