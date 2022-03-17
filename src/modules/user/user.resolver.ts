import { Auth } from 'src/decorators/auth.decorator';
import { Roles } from 'src/enums/roles.enum';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { CreateUserInput, UpdateUserInput } from './user.types';
import { Args, Mutation, Resolver, Query, Int } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/currentUser.decorator';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [UserEntity])
  async findUsers() {
    return this.userService.findAll();
  }

  @Mutation(() => UserEntity)
  async createUser(
    @Args('userData') userData: CreateUserInput,
  ): Promise<UserEntity> {
    return this.userService.create(userData);
  }

  @Auth(Roles.USER)
  @Mutation(() => UserEntity)
  async getUser(
    //@Args('userId', { type: () => Int }) userId: number,
    @CurrentUser() user,
  ): Promise<UserEntity> {
    return this.userService.findOne({ where: { id: user.id } });
  }

  @Auth()
  @Mutation(() => UserEntity)
  async updateUser(
    @Args('userData') userData: UpdateUserInput,
    @CurrentUser() user,
  ): Promise<UserEntity> {
    return this.userService.update(userData, user.id);
  }

  @Auth(Roles.USER)
  @Mutation(() => Boolean)
  async deleteUser(
    @Args('userId', { type: () => Int }) userId: number,
  ): Promise<boolean> {
    this.userService.delete(userId);
    return true;
  }
}
