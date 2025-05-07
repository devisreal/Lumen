import express, { Router } from "express";
import { createUser } from "@/controllers/auth.controllers";
import authorise from "@/middlewares/auth.middleware";
import { checkRoles } from "@/middlewares/checkRole.middleware";
import { UserRoles } from "@/types/roles";

const router: Router = express.Router();

router.post("/register", createUser);

router.get(
  "/validate",
  authorise,
  checkRoles(UserRoles.User, UserRoles.Admin),
  async (req, res) => {
    // const test = req.token;
    res.json({ isValid: true });
    return;
  },
);

export default router;
