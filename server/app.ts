import cors from 'cors';
import { CronJob } from 'cron';
import express from 'express';
import morgan from 'morgan';
import next from 'next';
import { join } from 'path';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { SECRET_PATH } from './config';
import { bot, task } from './lib';
import { router } from './routes';

// 定时任务
const oneDayOfJob = new CronJob('0 0 2 * * *', () => task(1, true));
const oneHourOfJob = new CronJob('0 0 2 * * *', () => task());
oneDayOfJob.start();
oneHourOfJob.start();

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev, dir: join(__dirname, '../client') });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  // connect database
  await createConnection();

  const server = express();

  // middleware
  server.use(cors());
  server.use(express.json());
  server.use(morgan('tiny', { skip: (req) => req.url.startsWith('/_next') }));

  // router
  server.use(router);
  // telegram bot webhook, telegraf bot
  server.use(SECRET_PATH, (req, res) => bot.handleUpdate(req.body, res));

  // client, next.js
  server.all('*', (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
