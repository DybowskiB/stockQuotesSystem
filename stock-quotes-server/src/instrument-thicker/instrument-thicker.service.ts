import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist';
import { Repository } from 'typeorm';
import { InstrumentThicker } from './entities/instrument-thicker.entity';
import { InstrumentThickerCreateDTO } from './dto/create-instrument-thicker.input';

@Injectable()
export class InstrumentThickerService {

    constructor(@InjectRepository(InstrumentThicker) private instrumentThickerRepository: Repository<InstrumentThicker>) {}

    async findAll(): Promise<InstrumentThicker[]> {
        return this.instrumentThickerRepository.find({
            relations: ["transactions"]
        });
    }

    async findOneBySymbol(symbol: string): Promise<InstrumentThicker> {
        return this.instrumentThickerRepository.findOne({ 
            relations: ["transactions"], 
            where: {symbol : symbol}
        });
      }
    
    async create(instrumentThickerDTO: InstrumentThickerCreateDTO): Promise<InstrumentThicker>{
        let instrumentThicker = this.instrumentThickerRepository.create(instrumentThickerDTO);
        return this.instrumentThickerRepository.save(instrumentThicker);
    }

}
