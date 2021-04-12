import dayjs from 'dayjs';
import { groupBy } from 'lodash';
import { Query, Resolver } from 'type-graphql';
import { House } from '../models';

@Resolver()
export class HouseResolver {
  @Query(() => [House])
  houses() {
    return House.find();
  }

  @Query(() => [String])
  async years() {
    const houses = await House.find({ select: ['ends_at'], cache: true });
    const years = groupBy(houses, (item) => dayjs(item.ends_at).get('year'));
    return Object.keys(years);
  }
}
