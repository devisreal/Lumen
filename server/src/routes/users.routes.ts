import express, { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "@/controllers/users.controllers";
import authMiddleware from "@/middlewares/auth.middleware";
import { checkRoles } from "@/middlewares/checkRole.middleware";
import { UserRoles } from "@/types/userRoles";

const router: Router = express.Router();

router.get(
  "/",
  authMiddleware,
  checkRoles(UserRoles.Admin, UserRoles.Moderator),
  getAllUsers,
);

router.get("/:slug", getUser);

router.delete(
  "/:slug",
  authMiddleware,
  checkRoles(UserRoles.Admin, UserRoles.Moderator),
  deleteUser,
);

export default router;
