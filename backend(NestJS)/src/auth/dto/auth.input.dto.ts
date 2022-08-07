import { Field, InputType, PickType } from '@nestjs/graphql';

@InputType()
export class RegisterUserInput {
  @Field()
  name: string;

  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  role: string;

  @Field()
  rate: number;
}

@InputType()
export class LoginUserInput extends PickType(RegisterUserInput, [
  'email',
  'password',
] as const) {}
