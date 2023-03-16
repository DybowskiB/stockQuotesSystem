import { Float } from "@nestjs/graphql";
import { Field, ObjectType } from "@nestjs/graphql/dist/decorators"
import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, Check } from "typeorm"

@ObjectType()
@Entity({name: "Transactions"})
export class Transaction{

    @Field()
    @PrimaryGeneratedColumn('uuid')
    transaction_id: string

    @Field()
    @Column({ name: 'timestamp', type: 'timestamp with time zone', default: (): string => 'LOCALTIMESTAMP' })
    timestamp: Date;

    @Field()
    @Column({ name: 'instrument_id', type: 'uuid' })
    instrument_id: string

    @Field(type => Float)
    @Check('price >= 0')
    @Column({ name: 'price', type: 'decimal', precision: 15, scale: 2 })
    price: number;

}