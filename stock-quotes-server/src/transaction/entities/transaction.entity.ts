import { Float } from "@nestjs/graphql";
import { Field, ObjectType } from "@nestjs/graphql/dist/decorators"
import { InstrumentThicker } from "../../../src/instrument-thicker/entities/instrument-thicker.entity";
import { Entity, PrimaryGeneratedColumn, Column, Check, ManyToOne, JoinColumn } from "typeorm"

@ObjectType()
@Entity({name: "transactions"})
export class Transaction{

    @Field()
    @PrimaryGeneratedColumn('uuid', {name: 'transaction_id'})
    transactionId: string

    @Field()
    @Column({ name: 'timestamp', type: 'timestamp with time zone', default: (): string => 'LOCALTIMESTAMP' })
    timestamp: Date;

    @Field(type => Float)
    @Check('price >= 0')
    @Column({ name: 'price', type: 'decimal', precision: 15, scale: 2 })
    price: number;

    @ManyToOne(() => InstrumentThicker, instrumentThicker => instrumentThicker.transactions, { nullable: false})
    @JoinColumn({name: 'instrument_thicker_id'})
    @Field(() => InstrumentThicker)
    instrumentThicker: InstrumentThicker
    
}