import { Field, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'houses' })
export class House extends BaseEntity {
  @Field(() => String)
  @PrimaryColumn()
  uuid: string;

  @Field(() => String)
  @Column()
  region: string;

  @Field(() => String)
  @Column()
  name: string;

  @Field(() => String)
  @Column()
  details: string;

  @Field(() => Int)
  @Column()
  quantity: number;

  @Field(() => Date)
  @Column({ name: 'started_at', type: 'timestamp with time zone' })
  startedAt: Date;

  @Field(() => Date)
  @Column({ name: 'finished_at', type: 'timestamp with time zone' })
  finishedAt: Date;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column()
  hash: string;
}
