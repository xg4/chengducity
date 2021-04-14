import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
export class BaseModel extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Date)
  @CreateDateColumn({ type: 'timestamp with time zone' })
  created_at: Date;

  @Field(() => Date)
  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updated_at: Date;
}
