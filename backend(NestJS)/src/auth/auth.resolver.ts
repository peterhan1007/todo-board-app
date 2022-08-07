import { Query as TQuery, Int } from 'type-graphql';
import {
  Query,
  Mutation,
  Resolver,
  Args,
  ResolveField,
  Parent,
} from '@nestjs/graphql';
import { UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserInputError } from 'apollo-server-core';

import { User } from './auth.entity';
import { UserService } from './auth.service';
import { GqlAuthGuard } from './gqlauthguard';
import { User as CurrentUser } from './auth.decorator';
import { LoginUserInput, RegisterUserInput } from './dto/auth.input.dto';
import { AuthUserPayload } from './dto/auth.payload.dto';
import { JobService } from 'src/job/job.service';
import { Job } from 'src/job/job.entity';

@Resolver((of) => User)
export class UserResolver {
  constructor(
    private readonly userService: UserService,
    private readonly jobService: JobService,
  ) {}

  @TQuery(() => String)
  @Query(() => String)
  @UseGuards(GqlAuthGuard)
  hello(): String {
    return 'hello world!';
  }

  @UseGuards(GqlAuthGuard)
  @Query((returns) => User, { name: 'getUser', nullable: true })
  async getUser(
    @CurrentUser() user: User,
    @Args({ name: 'id', type: () => Int }) id: number,
  ): Promise<User> {
    if (user.id !== id) throw new UnauthorizedException();

    return await this.userService.getUserById(id);
  }

  @Mutation((returns) => AuthUserPayload, { name: 'register', nullable: true })
  async register(@Args('userInfo') userInfo: RegisterUserInput) {
    const user = await this.userService.register(userInfo);

    if (!user) return new UserInputError('Username or password incorrect.');

    const token = this.userService.createToken({ id: user.id });

    const payload = new AuthUserPayload();
    payload.user = user;
    payload.token = token;
    return payload;
  }

  @Mutation((returns) => AuthUserPayload, { name: 'login', nullable: true })
  async login(@Args('userInfo') userInfo: LoginUserInput) {
    const user = await this.userService.login(userInfo);
    if (!user)
      return new UserInputError(
        `User by username ${userInfo.email} already exists.`,
      );

    const token = this.userService.createToken({ id: user.id });

    const payload = new AuthUserPayload();
    payload.user = user;
    payload.token = token;

    return payload;
  }

  @ResolveField(() => [Job])
  async jobs(@Parent() user: User) {
    if (user.jobs === []) {
      return user.jobs;
    }
    return this.jobService.getAll(user);
  }
}
