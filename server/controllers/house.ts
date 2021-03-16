import { Request, Response } from 'express';
import { Context } from 'telegraf';
import { v4 } from 'uuid';
import { bot, take } from '../../server/lib';
import { House, User } from '../../server/models';
import { composeContent } from '../../server/util';

const ERROR_MSG = 'Something wrong. Please contact xingor4@gmail.com.';

export async function now(ctx: Context) {
  try {
    const houses = await House.find({
      status: '正在报名',
    });

    await Promise.all(houses.map((house) => ctx.reply(composeContent(house))));
  } catch (err) {
    const errId = v4();
    console.log(errId, err);
    await ctx.reply(`${ERROR_MSG}\n${errId}`);
  }
}

export async function all(req: Request, res: Response) {
  try {
    const houses = await House.find({
      order: {
        ends_at: 'DESC',
      },
    });

    res.json({
      code: 0,
      data: houses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      msg: 'Internal Server Error',
    });
  }
}

export async function pull(req: Request, res: Response) {
  const { page } = req.body;
  try {
    const list = await take(page);

    const users = await User.find();

    const houses = await Promise.all(
      list.map(async (item) => {
        const savedHouses = await House.findOne({
          uuid: item.uuid,
        });

        const house = House.create(item);
        if (savedHouses?.status !== house.status) {
          await Promise.all(
            users.map((user) =>
              bot.telegram.sendMessage(
                user.telegram_chat_id,
                composeContent(house),
              ),
            ),
          );
        }
        await house.save();
        return house;
      }),
    );

    res.json({
      code: 0,
      data: houses,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      code: 500,
      msg: 'Internal Server Error',
    });
  }
}
