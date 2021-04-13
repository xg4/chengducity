import dayjs from 'dayjs';
import { Request, Response } from 'express';
import { Between } from 'typeorm';
import { bot, take } from '../../server/lib';
import { House, User } from '../../server/models';
import { composeContent } from '../../server/util';

export async function year(req: Request, res: Response) {
  const { year } = req.params;

  try {
    const date = dayjs(year);
    const houses = await House.find({
      where: {
        ends_at: Between(
          date.format('YYYY-MM-DD HH:mm:ss'),
          date.add(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
        ),
      },
      cache: true,
    });
    res.json(houses);
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal Server Error');
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

    res.json(houses);
  } catch (err) {
    console.log(err);
    res.status(500).json('Internal Server Error');
  }
}
