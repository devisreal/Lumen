import express, { Router } from "express";
import { getAllUsers, getUser } from "@/controllers/users.controllers";
import authorise from "@/middlewares/auth.middleware";
import { checkRoles } from "@/middlewares/checkRole.middleware";
import { UserRoles } from "@/types/roles";

const router: Router = express.Router();

router.get("/", getAllUsers);

router.get("/:slug", getUser);

export default router;
