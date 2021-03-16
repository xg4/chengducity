import { Telegraf } from 'telegraf';
import pkg from '../../package.json';
import { BOT_TOKEN, SECRET_PATH, WEBHOOK } from '../config';
import { houseController, userController } from '../controllers';

export const bot = new Telegraf(BOT_TOKEN);

bot.start(userController.token);

bot.command('token', userController.token);

bot.command('revoke', userController.revoke);

bot.command('show', userController.show);

bot.command('now', houseController.now);

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
