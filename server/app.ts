require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import express from 'express';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { bot, oneDayOfJob, oneHourOfJob } from './lib';
import { resolvers } from './resolvers';

dayjs.extend(utc);
dayjs.extend(timezone);

oneDayOfJob.start();
oneHourOfJob.start();

const SECRET_PATH = process.env.SECRET_PATH!;

const port = process.env.PORT || 5000;

const app = express();

async function main() {
  // connect database
  await createConnection();

  // middleware
  app.use(express.json());
  app.use(cors({ credentials: true, origin: true }));

  // telegram bot webhook, telegraf bot
  app.use(SECRET_PATH, (req, res) => bot.handleUpdate(req.body, res));

  // app.use('/', (_, res) => res.redirect(process.env.CLIENT_URL!));

  const schema = await buildSchema({
    resolvers,
  });
  const apolloServer = new ApolloServer({
    schema,
    context({ req, res }) {
      return {
        req,
        res,
        // TODO: Handle user/sessions here
        // user: req.user,
      };
    },
  });
  apolloServer.applyMiddleware({
    app,
    cors: false,
    path: '/graphql',
  });

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
