import { applyDecorators, UseGuards } from '@nestjs/common';
import { Mutation } from '@nestjs/graphql';
import { LocalAuthGuard } from 'src/guards/local-auth.guard';
import { Token } from 'src/modules/auth/auth.types';

export const Login = () =>
  applyDecorators(
    UseGuards(LocalAuthGuard),
    Mutation(() => Token),
  );
