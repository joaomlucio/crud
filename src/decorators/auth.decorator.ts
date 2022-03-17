import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { Roles } from 'src/enums/roles.enum';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';

export const Auth = (...roles: Roles[]) => {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtAuthGuard, RolesGuard),
  );
};
