import { Column, Entity } from 'typeorm';
import { BaseModel } from './BaseModel';

@Entity({ name: 'pull_requests' })
export class PullRequest extends BaseModel {
  @Column()
  type: string;

  @Column({ nullable: true })
  from?: string;
}
