import cors from "cors";
import express from "express";
import morgan from "morgan";
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
    app.use(morgan("tiny"));

    app.use("/tg", router);

    app.use(SECRET_PATH, (req, res) => bot.handleUpdate(req.body, res));

    app.listen(port, () => {
      console.log(`http://localhost:${port}`);
    });
  })
  .catch(console.error);
