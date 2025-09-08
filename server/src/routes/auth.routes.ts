import express, { Router } from "express";
import {
  createUser,
  getMyDetails,
  loginUser,
  logoutUser,
} from "@/controllers/auth.controllers";
import authMiddleware from "@/middlewares/auth.middleware";

const router: Router = express.Router();

router.post("/register", createUser);

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.get("/me", authMiddleware, getMyDetails);

router.get("/validate", authMiddleware, async (_req, res) => {
  res.json({ isValid: true });
  return;
});

export default router;
