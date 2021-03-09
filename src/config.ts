import dotenv from "dotenv";

dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

export const SECRET_PATH = process.env.SECRET_PATH ?? "/path";

export const WEBHOOK = process.env.WEBHOOK ?? "http://localhost";
