import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { ObjectType, Field, Int } from '@nestjs/graphql';

import { Job } from 'src/job/job.entity';

@ObjectType('User')
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ length: 50 })
  @Field()
  name: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  rate: number;

  @Column({ default: false })
  @Field()
  isApproved: boolean;

  @Column({ enum: ['admin', 'client', 'freelancer'], type: 'enum' })
  @Field()
  role: string;

  @Column({ unique: true })
  @Field()
  email: string;

  @OneToMany(() => Job, (job) => job.user, { cascade: true })
  jobs: Job[];
}
