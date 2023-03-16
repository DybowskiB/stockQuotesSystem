import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { InstrumentThicker } from './entities/instrument-thicker.entity';

@Injectable()
export class InstrumentThickerService {

    constructor(@InjectRepository(InstrumentThicker) private transactionRepository: Repository<InstrumentThicker>) {}

    async findAll(): Promise<InstrumentThicker[]> {

       // return this.transactionRepository.find();

       let iT: InstrumentThicker = new InstrumentThicker();
       iT.instrument_thicker_id = "fdscs"
       iT.symbol = "TSLA"

       return [iT]
    }

}
