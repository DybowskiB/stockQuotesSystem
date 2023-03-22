import { Field, InputType } from "@nestjs/graphql/dist/decorators"

@InputType()
export class InstrumentThickerCreateDTO{

    @Field()
    symbol: string

}