import { Request, Response } from "express";
import { ParseMode } from "typegram";
import { getRepository } from "typeorm";
import { bot } from "../bot";
import { Message } from "../entity/Message";
import { User } from "../entity/User";

interface PushMessage {
  token: string;
  content: string;
  type?: ParseMode;
}

export async function send(req: Request, res: Response) {
  const { token, content, type } = req.body as PushMessage;

  const userRepository = getRepository(User);

  const user = await userRepository.findOne({ token });

  if (!user) {
    res.json({
      code: 404,
      msg: `no such token: ${token}`,
    });
    return;
  }

  const chatId = user.telegram_chat_id;
  try {
    await bot.telegram.sendMessage(chatId, content, { parse_mode: type });

    const msgRepository = getRepository(Message);
    const msg = msgRepository.create({
      telegram_chat_id: chatId,
      content,
      type,
    });
    await msgRepository.manager.save(msg);
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
}
