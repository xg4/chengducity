import dayjs from 'dayjs';
import { Context, Telegraf } from 'telegraf';
import { MoreThan } from 'typeorm';
import { v4 } from 'uuid';
import pkg from '../../package.json';
import { BOT_TOKEN, SECRET_PATH, WEBHOOK } from '../config';
import { House, User } from '../models';
import { composeContent } from '../util';

export const bot = new Telegraf(BOT_TOKEN);

const ERROR_MSG = 'Something wrong. Please contact xingor4@gmail.com.';

const controller = {
  async token(ctx: Context) {
    const telegram_chat_id = ctx.chat?.id;

    try {
      const user = await User.findOne({ telegram_chat_id });
      if (user) {
        await ctx.reply(`Your token is already there: ${user.token}`);
        return;
      }

      // generate new token
      const token = v4();
      const newUser = User.create({
        telegram_chat_id,
        token,
      });
      await newUser.save();

      await ctx.reply(`Your token is now: ${token}`);
    } catch (err) {
      const errId = v4();
      console.log(errId, err);
      await ctx.reply(`${ERROR_MSG}\n${errId}`);
    }
  },
  async show(ctx: Context) {
    const telegram_chat_id = ctx.chat?.id;

    try {
      const user = await User.findOne({
        telegram_chat_id,
      });

      if (!user) {
        await ctx.reply(`You don't have any token`);
        return;
      }

      await ctx.reply(`Your current token is: ${user.token}`);
    } catch (err) {
      const errId = v4();
      console.log(errId, err);
      await ctx.reply(`${ERROR_MSG}\n${errId}`);
    }
  },
  async revoke(ctx: Context) {
    const telegram_chat_id = ctx.chat?.id;

    try {
      const user = await User.findOne({
        telegram_chat_id,
      });
      if (!user) {
        await ctx.reply(`You don't have any token`);
        return;
      }

      await user.remove();
      await ctx.reply('Done, revoke successfully');
    } catch (err) {
      const errId = v4();
      console.log(errId, err);
      await ctx.reply(`${ERROR_MSG}\n${errId}`);
    }
  },
  async now(ctx: Context) {
    try {
      const houses = await House.find({
        ends_at: MoreThan(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      });

      await Promise.all(
        houses.map((house) => ctx.reply(composeContent(house))),
      );
    } catch (err) {
      const errId = v4();
      console.log(errId, err);
      await ctx.reply(`${ERROR_MSG}\n${errId}`);
    }
  },
};

bot.start(controller.token);

bot.command('token', controller.token);

bot.command('revoke', controller.revoke);

bot.command('show', controller.show);

bot.command('now', controller.now);

bot.command('image', (ctx) =>
  ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' }),
);

bot.help((ctx) => ctx.reply(`For more info, see: ${pkg.homepage}`));

const commands = [
  {
    command: 'now',
    description: '获取正在报名的房源信息',
  },
  {
    command: 'token',
    description: 'generate authorization token',
  },
  {
    command: 'revoke',
    description: 'revoke access token',
  },
  {
    command: 'show',
    description: 'show your current token',
  },
  {
    command: 'image',
    description: 'get a random image',
  },
  {
    command: 'help',
    description: 'show help message',
  },
];

bot.telegram.setMyCommands(commands);

bot.catch((err: any) => {
  console.error('[bot] err:', err);
});

bot.telegram.setWebhook(WEBHOOK + SECRET_PATH);
