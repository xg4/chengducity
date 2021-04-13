import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Between } from 'typeorm';
import { bot, pull } from '../lib';
import { House, User } from '../models';
import { composeContent } from '../util';

@Resolver()
export class HouseResolver {
  @Query(() => [House])
  houses() {
    return House.find({ cache: true });
  }

  @Query(() => [House])
  async yearOfHouses(@Arg('year', () => Int) year: number) {
    const date = dayjs(`${year}`);
    const houses = await House.find({
      where: {
        ends_at: Between(
          date.format('YYYY-MM-DD HH:mm:ss'),
          date.add(1, 'year').format('YYYY-MM-DD HH:mm:ss'),
        ),
      },
      cache: true,
    });

    return houses;
  }

  @Query(() => [String])
  async years() {
    const houses = await House.find({ select: ['ends_at'], cache: true });
    const years = groupBy(houses, (item) => dayjs(item.ends_at).get('year'));
    return Object.keys(years);
  }

  @Mutation(() => [House])
  async pullHouses() {
    const list = await pull();

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

    return houses;
  }
}
