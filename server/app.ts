import cors from "cors";
import express from "express";
import morgan from "morgan";
import next from "next";
import { join } from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { bot } from "./bot";
import { SECRET_PATH } from "./config";
import { router } from "./routes";

const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== "production";

const app = next({ dev, dir: join(__dirname, "../client") });
const handle = app.getRequestHandler();

async function main() {
  await app.prepare();
  // connect database
  await createConnection();

  const server = express();

  // middleware
  server.use(cors());
  server.use(express.json());
  server.use(morgan("tiny", { skip: (req) => req.url.startsWith("/_next") }));

  // router
  server.use(router);
  // telegram bot webhook, telegraf bot
  server.use(SECRET_PATH, (req, res) => bot.handleUpdate(req.body, res));

  // client, next.js
  server.all("*", (req, res) => handle(req, res));

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
}

main();
