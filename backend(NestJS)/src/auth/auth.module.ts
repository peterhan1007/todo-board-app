import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from './jwt.strategy';

import { JobModule } from 'src/job/job.module';
import { User } from './auth.entity';
import { UserResolver } from './auth.resolver';
import { UserService } from './auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => JobModule)],
  controllers: [],
  providers: [UserService, UserResolver, JwtStrategy],
  exports: [UserService, UserResolver],
})
export class UserModule {}
