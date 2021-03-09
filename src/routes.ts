import express from "express";
import { ParseMode } from "telegraf/typings/telegram-types";
import { getRepository } from "typeorm";
import { bot } from "./bot";
import { User } from "./entity/User";

export const router = express.Router();

interface PushMessage {
  push_id: string;
  content: string;
  type?: ParseMode;
}

router.post("/push", async (req, res) => {
  const { push_id, content, type } = req.body as PushMessage;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ push_id });

  if (!user) {
    res.json({
      code: 404,
      msg: `no such push id: ${push_id}`,
    });
    return;
  }

  const chatId = user.telegram_chat_id;
  try {
    await bot.telegram.sendMessage(chatId, content, { parse_mode: type });
  } catch (err) {
    res.json({
      code: 500,
      msg: `${err}`,
    });
    return;
  }

  res.json({
    code: 0,
  });
});
