import dayjs from 'dayjs';
import { House, User } from 'server/models';
import { composeContent } from 'server/util';
import { Context, Telegraf } from 'telegraf';
import { MoreThan } from 'typeorm';
import { v4 } from 'uuid';
import pkg from '../../package.json';

const debug = require('debug')('lib:bot');

const BOT_TOKEN = process.env.BOT_TOKEN!;
const SECRET_PATH = process.env.SECRET_PATH!;
const SERVER_URL = process.env.SERVER_URL!;

export const bot = new Telegraf(BOT_TOKEN);

const ERROR_MSG = 'Something wrong. Please contact xingor4@gmail.com.';

const controller = {
  async token(ctx: Context) {
    const telegramChatId = ctx.chat?.id;

    try {
      const user = await User.findOne({ telegramChatId });
      if (user) {
        await ctx.reply(`Your token is already there: ${user.token}`);
        return;
      }

      // generate new token
      const token = v4();
      const newUser = User.create({
        telegramChatId,
        token,
      });
      await newUser.save();

      await ctx.reply(`Your token is now: ${token}`);
    } catch (err) {
      debug(err);
      await ctx.reply(ERROR_MSG);
    }
  },
  async show(ctx: Context) {
    const telegramChatId = ctx.chat?.id;

    try {
      const user = await User.findOne({
        telegramChatId,
      });

      if (!user) {
        await ctx.reply(`You don't have any token`);
        return;
      }

      await ctx.reply(`Your current token is: ${user.token}`);
    } catch (err) {
      debug(err);
      await ctx.reply(ERROR_MSG);
    }
  },
  async revoke(ctx: Context) {
    const telegramChatId = ctx.chat?.id;

    try {
      const user = await User.findOne({
        telegramChatId,
      });
      if (!user) {
        await ctx.reply(`You don't have any token`);
        return;
      }

      await user.remove();
      await ctx.reply('Done, revoke successfully');
    } catch (err) {
      debug(err);
      await ctx.reply(ERROR_MSG);
    }
  },
  async now(ctx: Context) {
    try {
      const houses = await House.find({
        finishedAt: MoreThan(dayjs().format('YYYY-MM-DD HH:mm:ss')),
      });

      if (!houses.length) {
        ctx.reply('暂无正在报名的房源');
        return;
      }

      await Promise.all(
        houses.map((house) => ctx.reply(composeContent(house))),
      );
    } catch (err) {
      debug(err);
      await ctx.reply(ERROR_MSG);
    }
  },
};

bot.command('start', controller.token);

bot.command('token', controller.token);

bot.command('revoke', controller.revoke);

bot.command('show', controller.show);

bot.command('now', controller.now);

bot.command('help', (ctx) => ctx.reply(`For more info, see: ${pkg.homepage}`));

const commands = [
  {
    command: 'now',
    description: '获取正在报名的房源信息',
  },
  {
    command: 'token',
    description: '生成 token',
  },
  {
    command: 'revoke',
    description: '销毁 token',
  },
  {
    command: 'show',
    description: '展示 token',
  },
  {
    command: 'help',
    description: '展示帮助信息',
  },
];

bot.telegram.setMyCommands(commands);

bot.catch((err) => {
  debug(err);
});

bot.telegram.setWebhook(SERVER_URL + SECRET_PATH);
