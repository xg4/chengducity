import express from "express";
import { messageController, userController } from "./controllers";

export const router = express.Router();

router.post("/push", messageController.send);

router.get("/users", userController.users);
