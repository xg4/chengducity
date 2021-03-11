import { Context } from "telegraf";
import { getRepository } from "typeorm";
import { v4 } from "uuid";
import { User } from "../entity/User";

const ERROR_MSG = "Something wrong. Please contact xingor4@gmail.com.";

export async function token(ctx: Context) {
  const telegram_chat_id = ctx.chat?.id;

  const userRepository = getRepository(User);

  try {
    const user = await userRepository.findOne({ telegram_chat_id });
    if (user) {
      ctx.reply(`Your token is already there: ${user.token}`);
      return;
    }

    // generate new token
    const token = v4();
    const newUser = userRepository.create({
      telegram_chat_id,
      token,
    });
    await userRepository.save(newUser);

    ctx.reply(`Your token is now: ${token}`);
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
  }
}

export async function show(ctx: Context) {
  const telegram_chat_id = ctx.chat?.id;

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({
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

  const userRepository = getRepository(User);
  try {
    const user = await userRepository.findOne({
      telegram_chat_id,
    });
    if (!user) {
      ctx.reply(`You don't have any token`);
      return;
    }

    await userRepository.remove(user);
    ctx.reply("Done, revoke successfully");
  } catch (err) {
    ctx.reply(`${ERROR_MSG}\n${err}`);
  }
}
