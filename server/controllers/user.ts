import { Request, Response } from 'express';
import { Context } from 'telegraf';
import { v4 } from 'uuid';
import { User } from '../models';

const ERROR_MSG = 'Something wrong. Please contact xingor4@gmail.com.';

export async function users(_req: Request, res: Response) {
  const pageSize = 10;
  const pageIndex = 1;

  const users = await User.find({
    order: {
      created_at: 'DESC',
    },
    take: pageSize,
    skip: (pageIndex - 1) * pageSize,
  });

  res.json({
    code: 0,
    data: [],
  });
}

export async function token(ctx: Context) {
  const telegram_chat_id = ctx.chat?.id;

  try {
    const user = await User.findOne({ telegram_chat_id });
    if (user) {
      ctx.reply(`Your token is already there: ${user.token}`);
      return;
    }

    // generate new token
    const token = v4();
    const newUser = User.create({
      telegram_chat_id,
      token,
    });
    await newUser.save();

    ctx.reply(`Your token is now: ${token}`);
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
  }
}

export async function show(ctx: Context) {
  const telegram_chat_id = ctx.chat?.id;

  try {
    const user = await User.findOne({
      telegram_chat_id,
    });

    if (!user) {
      ctx.reply(`You don't have any token`);
      return;
    }

    ctx.reply(`Your current token is: ${user.token}`);
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
  }
}

export async function revoke(ctx: Context) {
  const telegram_chat_id = ctx.chat?.id;

  try {
    const user = await User.findOne({
      telegram_chat_id,
    });
    if (!user) {
      ctx.reply(`You don't have any token`);
      return;
    }

    await user.remove();
    ctx.reply('Done, revoke successfully');
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
  }
}
