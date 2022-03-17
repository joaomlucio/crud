import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { EncryptionTransformer } from 'typeorm-encrypted';
import * as config from 'config';
import { Roles } from 'src/enums/roles.enum';

@Entity('user')
@ObjectType()
export class UserEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Field(() => String)
  @Column()
  name: string;

  @IsString()
  @Field(() => String)
  @Column({ unique: true })
  username: string;

  @HideField()
  @Column({
    type: 'varchar',
    nullable: false,
    transformer: new EncryptionTransformer(config.encrypt),
  })
  password: string;

  @IsOptional()
  @Field(() => Roles, { nullable: true })
  @Column({
    type: 'enum',
    enum: Roles,
    default: Roles.USER,
    nullable: true,
  })
  role?: Roles;

  @HideField()
  @Column({ nullable: false, type: 'varchar' })
  refreshToken: string;

  @HideField()
  @Column({ nullable: false })
  refreshTokenExpires: number;
}
