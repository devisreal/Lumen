import {
  createUser,
  getAllUsers,
  getUser,
} from "@/controllers/users.controllers";
import express, { Router, Application } from "express";

const router: Router = express.Router();

router.get("/", getAllUsers as Application);
router.get("/:slug", getUser as Application);
router.post("/register", createUser as Application);

export default router;
