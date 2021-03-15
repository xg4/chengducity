import dotenv from "dotenv";

dotenv.config();

export const BOT_TOKEN = process.env.BOT_TOKEN ?? "";

export const SECRET_PATH = process.env.SECRET_PATH ?? "/secret_path";

export const WEBHOOK = process.env.WEBHOOK ?? "https://localhost";
