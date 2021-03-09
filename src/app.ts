import cors from "cors";
import express from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { bot } from "./bot";
import { SECRET_PATH } from "./config";
import { router } from "./routes";

const port = process.env.PORT || 3000;

createConnection()
  .then(() => {
    const app = express();
    app.use(cors());
    app.use(express.json());

    app.use(router);

    app.use(bot.webhookCallback(SECRET_PATH));

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch(console.error);
