import { Request, Response } from 'express';
import { ParseMode } from 'typegram';
import { bot } from '../bot';
import { User } from '../models';

interface PushMessage {
  token: string;
  content: string;
  type?: ParseMode;
}

export async function send(req: Request, res: Response) {
  const { token, content, type } = req.body as PushMessage;

  const user = await User.findOne({ token });

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
