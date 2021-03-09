import { Context, Telegraf } from "telegraf";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import { BOT_TOKEN, SECRET_PATH, WEBHOOK } from "./config";
import { User } from "./entity/User";

export const bot = new Telegraf(BOT_TOKEN);

const ERROR_MSG = "Something wrong. Please contact xingor4@gmail.com.";
const HELP_MSG = `For more info, see: `;

async function generateController(ctx: Context) {
  const telegram_chat_id = ctx.chat.id;

  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ telegram_chat_id });
    if (user) {
      ctx.reply(`Your push id is now:

${user.push_id}`);

      return;
    }
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
    return;
  }

  const pushId = uuidv4();
  const newUser = userRepository.create({
    telegram_chat_id,
    push_id: pushId,
  });
  await userRepository.manager.save(newUser);

  ctx.reply(`Your push id is now:

${pushId}`);
}

bot.start(generateController);
bot.help((ctx) => ctx.reply(HELP_MSG));
bot.command("generate", generateController);

bot.command("mypushid", async (ctx) => {
  const telegram_chat_id = ctx.chat.id;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    telegram_chat_id,
  });

  if (!user) {
    ctx.reply(`You don't have any push id`);
  }

  ctx.reply(`Your current push id is: ${user.push_id}`);
});

const commands = [
  {
    command: "generate",
    description: "generate your push id",
  },
  {
    command: "mypushid",
    description: "show your current push id",
  },
  {
    command: "help",
    description: "show help message",
  },
];

bot.telegram.setMyCommands(commands);

bot.catch((err: any) => {
  console.error("Ooops", err);
});

bot.command("image", (ctx) =>
  ctx.replyWithPhoto({ url: "https://picsum.photos/200/300/?random" })
);
bot.on("text", (ctx) => ctx.replyWithHTML("<b>Hello</b>"));

bot.telegram.setWebhook(WEBHOOK + SECRET_PATH);
