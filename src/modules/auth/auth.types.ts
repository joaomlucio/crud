import { ArgsType, Field, ObjectType, PickType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserEntity } from '../user/user.entity';

@ObjectType()
export class Token extends PickType(
  UserEntity,
  ['id', 'role', 'username'] as const,
  ObjectType,
) {
  @IsString()
  @Field(() => String)
  accessToken: string;

  @IsString()
  @Field(() => String)
  refreshToken: string;
}

@ArgsType()
export class LoginInput extends PickType(
  UserEntity,
  ['username'] as const,
  ArgsType,
) {
  @IsString()
  @Field(() => String)
  password: string;
}
