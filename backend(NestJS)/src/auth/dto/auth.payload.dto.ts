import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../auth.entity';

@ObjectType()
export class AuthUserPayload {
  @Field(() => User)
  user: User;

  @Field()
  token: string;
}
