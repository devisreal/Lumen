import { db } from "@/db";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { userInsertSchema, users } from "@/db/schema";
import { checkExistingUser, generateSlug } from "@/utils/helpers";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { JwtPayload } from "@/types/auth";
import { UserRoles } from "@/types/roles";
import { InsertUserModel } from "@/types/schemaTypes";

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

export const loginUser = async (req: Request, res: Response) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const formData = req.body;
  let isValidEmail = false;

  if (emailRegex.test(formData.username)) {
    isValidEmail = true;
  }

  try {
    const [user] = await db
      .select()
      .from(users)
      .where(
        isValidEmail
          ? eq(users.email, formData.username)
          : eq(users.userName, formData.username),
      );

    if (!user) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "Invalid email or password",
        null,
        403,
      );
      return;
    }

    const result = await bcrypt.compare(formData.password, user.password);
    if (!result) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "Username/Password combination is incorrect",
        null,
        403,
      );
      return;
    }

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      slug: user.slug,
      role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "8h",
    });

    sendResponse(res, ResponseStatus.Success, "Welcome back!", {
      authToken: token,
    });
  } catch (error) {
    console.log(error);

    sendResponse(res, ResponseStatus.Error, "An error occured", error, 500);
  }
};
