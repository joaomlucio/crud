import { ApolloDriver } from '@nestjs/apollo';
import { GqlModuleOptions } from '@nestjs/graphql';
import * as config from 'config';

const configs = config.get('graphql');

export default {
  ...configs,
  driver: ApolloDriver,
  autoSchemaFile: true,
  resolvers: {},
  context: ({ req, connection }) =>
    connection ? { req: connection.context } : { req },
} as GqlModuleOptions;
