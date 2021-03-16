import { Request, Response } from 'express';
import { ParseMode } from 'typegram';
import { bot } from '../lib';
import { User } from '../models';

interface PushMessage {
  token: string;
  content: string;
  type?: ParseMode;
}

export async function push(req: Request, res: Response) {
  const { token, content, type } = req.body as PushMessage;

  try {
    const user = await User.findOne({ token });

    if (!user) {
      res.status(404).json({
        code: 404,
        msg: `no such token: ${token}`,
      });
      return;
    }

    const chatId = user.telegram_chat_id;

    await bot.telegram.sendMessage(chatId, content, { parse_mode: type });

    res.json({
      code: 0,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      msg: 'Internal Server Error',
    });
  }
}
