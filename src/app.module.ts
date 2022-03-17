import { ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppResolver } from './app.resolver';
import { AppService } from './app.service';
import graphqlConfig from './configs/graphql.config';
import ormConfig from './configs/orm.config';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    GraphQLModule.forRoot<ApolloDriverConfig>(graphqlConfig),
    UserModule,
    AuthModule,
  ],
  providers: [AppService, AppResolver],
})
export class AppModule {}
