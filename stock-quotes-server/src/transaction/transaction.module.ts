import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionResolver } from './transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Transaction } from './entities/transaction.entity';
import { InstrumentThickerModule } from 'src/instrument-thicker/instrument-thicker.module';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction]), InstrumentThickerModule],
  providers: [TransactionService, TransactionResolver]
})
export class TransactionModule {}
