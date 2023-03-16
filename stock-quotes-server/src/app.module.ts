import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TransactionModule } from './transaction/transaction.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Transaction } from './transaction/entities/transaction.entity';
import { InstrumentThicker } from './instrument-thicker/entities/instrument-thicker.entity';
import { InstrumentThickerModule } from './instrument-thicker/instrument-thicker.module';

@Module({
  imports: [
    TransactionModule,
    InstrumentThickerModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'ahghem7U',
      database: 'stockQuotes',
      entities: [Transaction, InstrumentThicker],
      synchronize: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
