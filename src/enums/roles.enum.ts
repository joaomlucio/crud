import { registerEnumType } from '@nestjs/graphql';

export enum Roles {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

registerEnumType(Roles, {
  name: 'Roles',
});

export const RolestResolver: Record<keyof typeof Roles, any> = Roles;
