require('dotenv').config();

import { ApolloServer } from 'apollo-server-express';
import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import express from 'express';
import next from 'next';
import { join } from 'path';
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

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const nextApp = next({ dev, dir: join(process.cwd(), './client') });
const handle = nextApp.getRequestHandler();

async function main() {
  // connect database
  await createConnection();

  await nextApp.prepare();

  const app = express();

  // middleware
  app.use(express.json());

  // telegram bot webhook, telegraf bot
  app.use(SECRET_PATH, (req, res) => bot.handleUpdate(req.body, res));

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
    path: '/graphql',
  });

  // client, next.js
  app.all('*', (req, res) => handle(req, res));

  app.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
