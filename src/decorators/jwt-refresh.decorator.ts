import { applyDecorators, UseGuards } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { JwtRefreshAuthGuard } from 'src/guards/jwt-refresh-auth.guard';
import { Token } from 'src/modules/auth/auth.types';

export const Refresh = () => {
  return applyDecorators(
    UseGuards(JwtRefreshAuthGuard),
    Mutation(() => Token),
  );
};
