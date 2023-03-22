import { Float } from "@nestjs/graphql";
import { Field, InputType } from "@nestjs/graphql/dist/decorators"

@InputType()
export class TransactionCreateDTO{

    @Field()
    timestamp: Date;

    @Field(type => Float)
    price: number;

    @Field()
    symbol: string; 
    
}