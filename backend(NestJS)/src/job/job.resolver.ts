import {
  HttpException,
  HttpStatus,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
} from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';

import { GqlAuthGuard } from 'src/auth/gqlauthguard';
import { Job } from './job.entity';
import { JobService } from './job.service';
import { User as CurrentUser } from '../auth/auth.decorator';
import { User } from 'src/auth/auth.entity';
import { JobInput } from './dto/job.input.dto';
import { UserService } from 'src/auth/auth.service';

@Resolver((of) => Job)
export class JobResolver {
  constructor(
    private readonly jobService: JobService,
    private readonly userService: UserService,
  ) {}

  // @UseGuards(GqlAuthGuard)
  @Query((returns) => [Job], { name: 'getAllJobs', nullable: true })
  async getAllJobs(@CurrentUser() user: User): Promise<Job[]> {
    return await this.jobService.getAll(user);
  }

  // @UseGuards(GqlAuthGuard)
  @Query((returns) => Job, { name: 'getJobById', nullable: true })
  async getJobById(@Args('id', { type: () => Int }) id: number) {
    return this.jobService.getById({ id });
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Job, { name: 'createJob', nullable: true })
  async createJob(
    @CurrentUser() user: User,
    @Args('jobInfo') jobInfo: JobInput,
  ) {
    // return this.jobService.create(jobInfo, user.id);
    return this.jobService.create(jobInfo, 20);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation((returns) => Job, { name: 'updateJob', nullable: true })
  async updateJob(
    @CurrentUser() user: User,
    @Args('jobInfo') jobInfo: JobInput,
    @Args('id', { type: () => Int }) id: number,
  ) {
    const job = await this.jobService.getById({ id });
    if (job.userId !== user.id) {
      throw new UnauthorizedException("You aren't the author of this job");
    }
    return this.jobService.update(jobInfo, id);
  }

  // @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean, { name: 'removeJob', nullable: true })
  async removeJob(
    @CurrentUser() user: User,
    @Args('id', { type: () => Int }) id: number,
  ) {
    const job = await this.jobService.getById({ id });
    if (job === null)
      throw new HttpException('Deleted or none', HttpStatus.BAD_REQUEST);
    if (job.userId !== user.id) {
      throw new UnauthorizedException("You aren't the author of this job.");
    }
    return this.jobService.remove(id);
  }

  @ResolveField(() => User)
  async user(@Parent() job: Job) {
    if (job.user) {
      return job.user;
    }
    return await this.userService.getUserById(job.userId);
  }
}
