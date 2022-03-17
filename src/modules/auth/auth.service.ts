import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { Token } from './auth.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(username: string, pswd: string): Promise<any> {
    const user = await this.userService.findOne({
      where: { username: username },
    });
    if (user && user.password === pswd) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = user;
      return rest;
    }
    return null;
  }

  async login(user: UserEntity): Promise<Token> {
    const payload = {
      username: user.username,
      id: user.id,
      role: user.role,
    };
    return {
      ...payload,
      accessToken: this.jwtService.sign(payload),
      refreshToken: await this.userService.getOrUpdateRefreshToken(user.id),
    };
  }
}
