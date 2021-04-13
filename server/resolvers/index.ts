import { HouseResolver } from './house';
import { MessageResolver } from './message';

export const resolvers = [HouseResolver, MessageResolver] as const;
