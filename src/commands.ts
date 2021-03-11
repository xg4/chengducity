import { bot } from "./bot";
import { userController } from "./controllers";

bot.start(userController.generate);

bot.help((ctx) => ctx.reply(`For more info, see: `));

bot.command("generate", userController.generate);

bot.command("show", userController.show);

bot.command("image", (ctx) =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);

const commands = [
  {
    command: "generate",
    description: "generate your push id",
  },
  {
    command: "show",
    description: "show your current push id",
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
