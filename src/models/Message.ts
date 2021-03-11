import { Column, Entity } from "typeorm";
import { BaseModel } from "./BaseModel";

@Entity()
export class Message extends BaseModel {
  @Column()
  telegram_chat_id: number;

  @Column()
  content: string;

  @Column()
  type?: string;
}
