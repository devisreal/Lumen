import { getUsersController } from "@/controllers/users.controllers";
import express, { Router, Response, Request } from "express";

const router: Router = express.Router();

router.get("/", getUsersController);

export default router;
