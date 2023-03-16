import { Float } from "@nestjs/graphql";
import { Field, InputType } from "@nestjs/graphql/dist/decorators"
import { type } from "os";

@InputType()
export class TransactionCreateDTO{

    @Field()
    timestamp: Date;

    @Field()
    instrument_id: string

    @Field(type => Float)
    price: number;

}