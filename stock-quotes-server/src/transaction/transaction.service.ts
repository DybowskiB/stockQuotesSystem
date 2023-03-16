import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { TransactionCreateDTO } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

    constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>) {}

    async findAll(): Promise<Transaction[]> {
       return this.transactionRepository.find();
    }

    async create(transaction: TransactionCreateDTO): Promise<Transaction>{
        let tran = this.transactionRepository.create(transaction);
        return this.transactionRepository.save(tran);
    }

}
