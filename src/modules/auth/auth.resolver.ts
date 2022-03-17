import { Args, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/decorators/currentUser.decorator';
import { Refresh } from 'src/decorators/jwt-refresh.decorator';
import { Login } from 'src/decorators/login.decorator';
import { AuthService } from './auth.service';
import { LoginInput, Token } from './auth.types';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Login()
  async login(@Args() args: LoginInput, @CurrentUser() user): Promise<Token> {
    return this.authService.login(user);
  }

  @Refresh()
  async refresh(
    @Args('refreshToken') refreshToken: string,
    @CurrentUser() user,
  ): Promise<Token> {
    return this.authService.login(user);
  }
}
