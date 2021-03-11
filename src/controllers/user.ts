import { Context } from "telegraf";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { User } from "../entity/User";

const ERROR_MSG = "Something wrong. Please contact xingor4@gmail.com.";

export async function generate(ctx: Context) {
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

  const pushId = v4();
  const newUser = userRepository.create({
    telegram_chat_id,
    push_id: pushId,
  });
  await userRepository.manager.save(newUser);

  ctx.reply(`Your push id is now:
  
  ${pushId}`);
}

export async function show(ctx: Context) {
  const telegram_chat_id = ctx.chat.id;

  const userRepository = getRepository(User);
  const user = await userRepository.findOne({
    telegram_chat_id,
  });

  if (!user) {
    ctx.reply(`You don't have any push id`);
  }

  ctx.reply(`Your current push id is: ${user.push_id}`);
}
