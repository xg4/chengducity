import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'houses' })
export class House extends BaseEntity {
  @PrimaryColumn()
  uuid: string;

  @Column()
  region: string;

  @Column()
  name: string;

  @Column()
  details: string;

  @Column()
  number: string;

  @Column()
  starts_at: string;

  @Column()
  ends_at: string;

  @Column()
  status: string;

  @Column()
  source: string;
}
