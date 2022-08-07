import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Job } from './job.entity';
import { JobResolver } from './job.resolver';
import { JobService } from './job.service';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { UserModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Job]), forwardRef(() => UserModule)],
  controllers: [],
  providers: [JobService, JobResolver, JwtStrategy],
  exports: [JobService, JobResolver],
})
export class JobModule {}
