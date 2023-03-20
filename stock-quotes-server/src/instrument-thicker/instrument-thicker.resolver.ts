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

    @Query(() => InstrumentThicker, { name: 'findInstrumentThickerBySymbol' })
    findOneBySymbol(@Args('symbol') symbol: string) {
    return this.instrumentThickerService.findOneBySymbol(symbol);
  }

    @Mutation( () => InstrumentThicker, {name: 'createInstrumentThicker'})
    create(@Args('instrumentThickerInput') instrument : InstrumentThickerCreateDTO){
        
        return this.instrumentThickerService.create(instrument);
    }

}
