import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransactionModule } from './transaction/transaction.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InstrumentThickerModule } from './instrument-thicker/instrument-thicker.module';
import ormconfig from '../orm.config'

@Module({
  imports: [
    TransactionModule,
    InstrumentThickerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot(ormconfig),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
