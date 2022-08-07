import { InputType } from '@nestjs/graphql';
import { FilterableField } from '@nestjs-query/query-graphql';

@InputType()
export class JobInput {
  @FilterableField({ nullable: true })
  title?: string;

  @FilterableField({ nullable: true })
  description?: string;

  @FilterableField({ nullable: true })
  rate?: number;

  @FilterableField({ nullable: true })
  status?: string;
}
