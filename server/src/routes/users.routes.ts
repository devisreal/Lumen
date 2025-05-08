import express, { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUser,
} from "@/controllers/users.controllers";
import authorise from "@/middlewares/auth.middleware";
import { checkRoles } from "@/middlewares/checkRole.middleware";
import { UserRoles } from "@/types/roles";

const router: Router = express.Router();

router.get(
  "/",
  authorise,
  checkRoles(UserRoles.Admin, UserRoles.Moderator),
  getAllUsers,
);

router.get("/:slug", getUser);
router.delete("/:slug", authorise, deleteUser);

export default router;
