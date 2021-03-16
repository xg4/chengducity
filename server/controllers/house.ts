import { Request, Response } from 'express';
import { bot, take } from '../../server/lib';
import { House, User } from '../../server/models';

function composeContent({
  region,
  name,
  details,
  number,
  starts_at,
  ends_at,
  status,
}: House) {
  return `
  ${region} ${name} ${status}\n
  ${starts_at} ~ ${ends_at}\n
  ${details}\n
  ${number}套\n
  `.trim();
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
