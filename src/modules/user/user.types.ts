import { Field, InputType, OmitType, PartialType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { UserEntity } from './user.entity';

@InputType()
export class CreateUserInput extends OmitType(UserEntity, ['id'], InputType) {
  @IsString()
  @Field(() => String)
  password: string;
}

@InputType()
export class UpdateUserInput extends PartialType(UserEntity, InputType) {}
