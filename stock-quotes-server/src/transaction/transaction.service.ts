import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { InstrumentThickerCreateDTO } from 'src/instrument-thicker/dto/create-instrument-thicker.input';
import { InstrumentThickerService } from 'src/instrument-thicker/instrument-thicker.service';
import { Repository } from 'typeorm';
import { TransactionCreateDTO } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {

    constructor(@InjectRepository(Transaction) private transactionRepository: Repository<Transaction>, private instrumentThickerService: InstrumentThickerService) {}

    async findAll(): Promise<Transaction[]> {
       return this.transactionRepository.find({
        relations: ["instrumentThicker"]
       });
    }

    async create(transaction: TransactionCreateDTO): Promise<Transaction>{

        let symbol = transaction.symbol;
        let instrumentThicker = await this.instrumentThickerService.findOneBySymbol(symbol);

        if(!instrumentThicker){
            let instrumentThickerDTO = new InstrumentThickerCreateDTO()
            instrumentThickerDTO.symbol = symbol;
            instrumentThicker = await this.instrumentThickerService.create(instrumentThickerDTO)
        }

        let tran = await this.transactionRepository.create(transaction);
        tran.instrumentThicker = instrumentThicker;
        
        return this.transactionRepository.save(tran);
    }
    
}
