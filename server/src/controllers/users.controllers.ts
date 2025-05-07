import { Request, Response } from "express";
import "dotenv/config";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendResponse } from "@/utils/sendResponse";
import { checkExistingUser, generateSlug } from "@/utils/helpers";
import { db } from "@/db";
import { userInsertSchema, users } from "@/db/schema";
import { ResponseStatus } from "@/types/apiResponse";
import { UserRoles } from "@/types/roles";
import { SelectUserModel, InsertUserModel } from "@/types/schemaTypes";
import { JwtPayload } from "@/types/auth";
import { eq as equals } from "drizzle-orm";

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

export const createUser = async (req: Request, res: Response) => {
  const formData: InsertUserModel = req.body;
  const userSlug: string = generateSlug(formData.userName);
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

  try {
    const userExists = await checkExistingUser(
      formData.userName,
      formData.email,
    );

    if (userExists) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "User with this username or email already exists.",
        null,
        409,
      );
    }

    const parsedData = userInsertSchema.safeParse({
      ...formData,
      slug: userSlug,
      password: "placeholder",
      role: UserRoles.User,
      updated_at: new Date(),
    });
    if (!parsedData.success) {
      console.log(parsedData.error.errors);
      sendResponse(
        res,
        ResponseStatus.Error,
        "Fill in all required fields",
        parsedData.error.errors,
        400,
      );
    }

    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(formData.password, salt);

    const user: InsertUserModel = {
      userName: formData.userName,
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: hashedPassword,
      slug: userSlug,
      role: UserRoles.User,
      updated_at: new Date(),
    };

    const [insertedUser] = await db.insert(users).values(user).returning();

    if (!insertedUser) {
      sendResponse(res, ResponseStatus.Fail, "User insert failed", null, 500);
    }

    const payload: JwtPayload = {
      id: insertedUser.id,
      email: insertedUser.email,
      slug: insertedUser.slug,
      role: insertedUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "8h",
    });

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
