'use strict';

import * as path from 'path';

import * as dotenv from 'dotenv';
dotenv.config();

import * as mongoose from 'mongoose';
const username: string = process.env.DB_USERNAME || ``;
const password: string = process.env.DB_PASSWORD || ``;
const auth = (username.length > 0 && password.length > 0) ? `${encodeURIComponent(username)}:${encodeURIComponent(password)}` : ``;
mongoose.connect(`mongodb://${auth}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_DATABASE}`, { useNewUrlParser: true });

import * as express from 'express';
import * as expressAsyncAwait from 'express-async-await';
import * as bodyParser from 'body-parser';
const app: express.Application = expressAsyncAwait(express());

// Enable parsing application/json
app.use(bodyParser.json());

const wwwDir: string = path.join(__dirname, `..`, `www`);
app.use(`/static`, express.static(wwwDir));

app.get(`/`, (req: express.Request, res: express.Response) => {
  res.sendFile(path.join(wwwDir, `index.html`));
});

import { IMessageModel, Message } from './schemas/message';

app.get(`/api/messages`, async (req: express.Request, res: express.Response) => {
  const messages: IMessageModel[] = await Message.find();
  res.send(messages);
});

app.post(`/api/messages`, async (req: express.Request, res: express.Response) => {
  const message: IMessageModel = await Message.create({
    content: req.body.content,
    notifyTime: new Date(req.body.notifyTime),
  });
  res.send(message);
});

app.listen(process.env.PORT);
