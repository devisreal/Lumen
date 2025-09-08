import config from "@/config/config";
import { db } from "@/db";
import bcrypt from "bcryptjs";
import "dotenv/config";
import { eq } from "drizzle-orm";
import { Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { userInsertSchema, users } from "@/db/schema";
import { checkExistingUser, generateSlug } from "@/utils/helpers";
import { sendResponse } from "@/utils/sendResponse";
import { ResponseStatus } from "@/types/apiResponse";
import { JwtPayload } from "@/types/auth";
import { InsertUserModel, SelectUserModel } from "@/types/schemaTypes";
import { UserRoles } from "@/types/userRoles";
import { userStatusMessages } from "@/types/userStatus";

const isProd = config.nodeEnv === "production";

export const createUser: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const formData: InsertUserModel = req.body;
  const userSlug: string = generateSlug(formData.username);
  const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;

  try {
    const userExists = await checkExistingUser(
      formData.username,
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
      username: formData.username,
      firstname: formData.firstname,
      lastname: formData.lastname,
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
      sub: insertedUser.id.toString(),
      email: insertedUser.email,
      slug: insertedUser.slug,
      role: insertedUser.role,
      iss: "https://yourapi.com", // your API/service
      aud: "https://yourfrontend.com", // the intended client
      // iat: Math.floor(Date.now() / 1000), // issued at
      // exp: Math.floor(Date.now() / 1000) + 15 * 60, // expire in 15 minutes
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    sendResponse(res, ResponseStatus.Success, "Account created successfully!,");
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
          : eq(users.username, formData.username),
      );

    if (!user) {
      sendResponse(res, ResponseStatus.Error, "Invalid credentials", null, 403);
      return;
    }

    if (user.status in userStatusMessages) {
      sendResponse(
        res,
        ResponseStatus.Error,
        userStatusMessages[user.status],
        null,
        403,
      );
      return;
    }

    const result = await bcrypt.compare(formData.password, user.password);
    if (!result) {
      sendResponse(res, ResponseStatus.Error, "Invalid credentials", null, 403);
      return;
    }

    const payload: JwtPayload = {
      sub: user.id.toString(),
      email: user.email,
      slug: user.slug,
      role: user.role,
      iss: "https://yourapi.com", // your API/service
      aud: "https://yourfrontend.com", // the intended client
      // iat: Math.floor(Date.now() / 1000), // issued at
      // exp: Math.floor(Date.now() / 1000) + 15 * 60, // expire in 15 minutes
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("access_token", token, {
      httpOnly: true,
      secure: isProd,
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 1000,
    });

    sendResponse(res, ResponseStatus.Success, "Welcome back!");
    return;
  } catch (error) {
    console.log(error);

    sendResponse(res, ResponseStatus.Error, "An error occured", error, 500);
    return;
  }
};

export const logoutUser: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  try {
    const token = req.cookies?.access_token;

    if (!token) {
      sendResponse(
        res,
        ResponseStatus.Error,
        "No active session to log out",
        null,
        400,
      );
      return;
    }
    // Clear the auth cookie
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: isProd,
      // sameSite: "lax", // adjust if frontend is on different domain
    });

    sendResponse(
      res,
      ResponseStatus.Success,
      "Logged out successfully",
      null,
      200,
    );
    return;
  } catch (error) {
    console.error("Logout error:", error);
    sendResponse(
      res,
      ResponseStatus.Error,
      "Something went wrong while logging out",
      500,
    );
    return;
  }
};

export const getMyDetails: RequestHandler = async (
  req: Request,
  res: Response,
) => {
  const slug = (req as any).user.slug;
  try {
    const [user]: SelectUserModel[] = await db
      .select()
      .from(users)
      .where(eq(users.slug, String(slug)));

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
