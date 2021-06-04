import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column({ name: 'telegram_chat_id', unique: true })
  telegramChatId: number;

  @Column({ nullable: true })
  token?: string;
}
