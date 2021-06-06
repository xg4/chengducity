import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { bot, pull } from 'server/lib';
import { House, PullRequest, User } from 'server/models';
import { composeContent } from 'server/util';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Between } from 'typeorm';

const debug = require('debug')('resolver:house');

@Resolver()
export class HouseResolver {
  @Query(() => [House])
  houses() {
    try {
      return House.find();
    } catch (err) {
      debug(err);
      throw new Error('Internal Server Error');
    }
  }

  @Query(() => [House])
  async yearOfHouses(@Arg('year', () => Int) year: number) {
    try {
      const date = dayjs(`${year}`);
      const houses = await House.find({
        where: {
          finishedAt: Between(
            date.format('YYYY-MM-DD HH:mm:ss'),
            date.add(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
          ),
        },
      });

      return houses;
    } catch (err) {
      debug(err);
      throw new Error('Internal Server Error');
    }
  }

  @Query(() => Int)
  recordsCount() {
    try {
      return PullRequest.count();
    } catch (err) {
      debug(err);
      throw new Error('Internal Server Error');
    }
  }

  @Query(() => [String])
  async years() {
    try {
      const houses = await House.find({ select: ['finishedAt'] });
      const years = groupBy(houses, (item) =>
        dayjs(item.finishedAt).get('year'),
      );
      return Object.keys(years);
    } catch (err) {
      debug(err);
      throw new Error('Internal Server Error');
    }
  }

  @Mutation(() => [House])
  async pullHouses() {
    try {
      const houses = await pull(1, 'first');

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

      const sendHouses = diffHouses.filter(Boolean) as House[];

      if (sendHouses.length) {
        const users = await User.find();
        for (const user of users) {
          await Promise.all(
            sendHouses.map((house) =>
              bot.telegram.sendMessage(
                user.telegramChatId,
                composeContent(house),
              ),
            ),
          );
        }
      }

      return sendHouses;
    } catch (err) {
      debug(err);
      throw new Error('Internal Server Error');
    }
  }
}
