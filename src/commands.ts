import { bot } from "./bot";
import { userController } from "./controllers";

bot.start(userController.token);

bot.command("token", userController.token);

bot.command("revoke", userController.revoke);

bot.command("show", userController.show);

bot.command("image", (ctx) =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);

bot.help((ctx) => ctx.reply(`For more info, see: `));

const commands = [
  {
    command: "token",
    description: "generate authorization token",
  },
  {
    command: "revoke",
    description: "revoke access token",
  },
  {
    command: "show",
    description: "show your current token",
  },
  {
    command: "image",
    description: "get a random image",
  },
  {
    command: "help",
    description: "show help message",
  },
];

bot.telegram.setMyCommands(commands);
