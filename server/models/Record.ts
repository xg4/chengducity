import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'records' })
export class Record extends BaseModel {
  @Column()
  type: string;
}
