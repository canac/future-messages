import * as mongoose from 'mongoose';
import { IMessage } from '../interfaces/message';

export interface IMessageModel extends IMessage, mongoose.Document {}

export const MessageSchema: mongoose.Schema = new mongoose.Schema({
  content: String,
  notifyTime: Date,
});

export const Message: mongoose.Model<IMessageModel> = mongoose.model<IMessageModel>(`message`, MessageSchema);
