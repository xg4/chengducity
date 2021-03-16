import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'users' })
export class User extends BaseModel {
  @Column({ unique: true })
  telegram_chat_id: number;

  @Column()
  token: string;
}
