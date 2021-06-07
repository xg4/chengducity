import { CronJob } from 'cron';
import dayjs from 'dayjs';
import { House, User } from 'server/models';
import { composeContent } from 'server/util';
import { bot } from './bot';
import { pull, RemoteHouses } from './spider';

const debug = require('debug')('lib:task');

async function diff(houses: RemoteHouses[]) {
  const diffHouses = await Promise.all(
    houses.map(async (item) => {
      const savedHouse = await House.findOne({
        uuid: item.uuid,
      });

      const house = House.create(item);

      if (savedHouse?.status !== house.status) {
        return house.save();
      }
    }),
  );

  const sendHouses = diffHouses.filter(
    (item) => item instanceof House,
  ) as House[];

  if (sendHouses.length) {
    const users = await User.find();
    for (const user of users) {
      await Promise.all(
        sendHouses.map((house) =>
          bot.telegram.sendMessage(user.telegramChatId, composeContent(house)),
        ),
      );
    }
  }
}

export const oneDayOfJob = new CronJob('0 0 0 * * *', async () => {
  debug('[oneDayOfJob] start ', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const houses = await pull(1, 'month');
  debug('[oneDayOfJob] end ', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  await diff(houses);
});

export const oneHourOfJob = new CronJob('0 0 * * * *', async () => {
  debug('[oneHourOfJob] start ', dayjs().format('YYYY-MM-DD HH:mm:ss'));
  const houses = await pull(1, 'day');
  debug('[oneHourOfJob] end ', dayjs().format('YYYY-MM-DD HH:mm:ss'));

  await diff(houses);
});
