import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import jwtConfig from 'src/configs/jwt.config';
import { UserService } from '../user/user.service';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
  Strategy,
  'jwtRefresh',
) {
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConfig.secret,
      passReqToCallback: true,
    });
  }

  async validate(req, payload: any): Promise<any> {
    const user = await this.userService.findOne({ where: { id: payload.id } });
    if (!user) throw new UnauthorizedException();

    if (req.body.refreshToken == user.refreshToken) {
      if (new Date().getDate() > user.refreshTokenExpires) {
        throw new UnauthorizedException();
      }
    } else throw new UnauthorizedException();

    return payload;
  }
}
