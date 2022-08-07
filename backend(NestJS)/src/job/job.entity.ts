import {
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { User } from 'src/auth/auth.entity';

@ObjectType('Job')
@Entity()
export class Job {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ length: 200 })
  @Field()
  title: string;

  @Column({ length: 500 })
  @Field()
  description: string;

  @Column()
  @Field()
  rate: number;

  @Column({ enum: ['active', 'posted'], type: 'enum', default: 'active' })
  @Field()
  status: string;

  @Column({ default: false })
  @Field()
  isApproved: boolean;

  @ManyToOne((type) => User, (user) => user.jobs, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: number;
}
