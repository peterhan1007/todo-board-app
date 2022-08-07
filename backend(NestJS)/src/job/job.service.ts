import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Job } from './job.entity';
import { JobInput } from './dto/job.input.dto';

interface FindAllArgs {
  relations?: string[];
  userId?: number;
}

interface FindOneArgs extends FindAllArgs {
  id: number;
}

@Injectable()
export class JobService {
  constructor(
    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>,
  ) {}

  async getAll(user): Promise<Job[]> {
    // if (user.role === 'admin') {
    return await this.jobRepository.find({
      order: {
        id: 'desc',
      },
    });
    // }
    // if (user.role === 'client') {
    //   return await this.jobRepository.find({
    //     where: {
    //       isApproved: true,
    //       user: user,
    //     },
    //     order: {
    //       id: 'desc',
    //     },
    //   });
    // }
    // if (user.role === 'freelancer') {
    //   return await this.jobRepository.find({
    //     where: {
    //       status: 'active',
    //       isApproved: true,
    //     },
    //     order: {
    //       id: 'desc',
    //     },
    //   });
    // }
  }

  async create(jobInfo: JobInput, userId: number): Promise<Job> {
    const job = this.jobRepository.save({
      ...jobInfo,
      user: {
        id: userId,
      },
    });
    return job;
  }

  async getById({ id }: FindOneArgs): Promise<Job> {
    return await this.jobRepository.findOneBy({ id });
  }

  async update(jobInfo: JobInput, id: number): Promise<Job> {
    const funThis = this;
    return await this.jobRepository.update(id, jobInfo).then((res) => {
      return funThis.jobRepository.findOneBy({ id });
    });
  }

  async remove(id: number) {
    await this.jobRepository.delete({ id });
    return true;
  }
}
