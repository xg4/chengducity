import { Field, ObjectType } from 'type-graphql';
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

  @Field(() => String)
  @Column()
  number: string;

  @Field(() => String)
  @Column()
  starts_at: string;

  @Field(() => String)
  @Column()
  ends_at: string;

  @Field(() => String)
  @Column()
  status: string;

  @Field(() => String)
  @Column({ select: false })
  source: string;
}
