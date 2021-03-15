import express from "express";
import { messageController } from "./controllers";

export const router = express.Router();

router.post("/push", messageController.send);
