import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { InstrumentThickerCreateDTO } from './dto/create-instrument-thicker.input';
import { InstrumentThicker } from './entities/instrument-thicker.entity';
import { InstrumentThickerService } from './instrument-thicker.service';

@Resolver(() => InstrumentThicker)
export class InstrumentThickerResolver {

    constructor(private instrumentThickerService: InstrumentThickerService) { }

    @Query(() => [InstrumentThicker], { name: "getAllInstrumentThickers" })
    findAll() {
        return this.instrumentThickerService.findAll();
    }

}
