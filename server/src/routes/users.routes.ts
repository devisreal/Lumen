import express, { Router } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
} from "@/controllers/users.controllers";
import authorise from "@/middlewares/auth.middleware";
import { checkRoles } from "@/middlewares/checkRole.middleware";
import { UserRoles } from "@/types/roles";

const router: Router = express.Router();

router.get("/", getAllUsers);
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

router.get("/:slug", getUser);

export default router;
