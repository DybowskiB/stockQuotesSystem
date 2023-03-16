import { Resolver, Query } from '@nestjs/graphql';
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
