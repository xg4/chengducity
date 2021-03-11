import { Telegraf } from "telegraf";
import { BOT_TOKEN, SECRET_PATH, WEBHOOK } from "./config";

export const bot = new Telegraf(BOT_TOKEN);

bot.catch((err: any) => {
  console.error("[bot] err:", err);
});

bot.on("text", (ctx) => ctx.replyWithHTML("<b>Hello</b>"));

bot.telegram.setWebhook(WEBHOOK + SECRET_PATH);
