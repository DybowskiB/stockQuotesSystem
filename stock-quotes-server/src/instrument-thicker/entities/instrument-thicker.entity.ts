import { Field, ObjectType } from "@nestjs/graphql/dist/decorators"
import { Transaction } from "../../../src/transaction/entities/transaction.entity"
import { Entity, PrimaryGeneratedColumn, Column, Unique, OneToMany } from "typeorm"

@ObjectType()
@Entity({ name: 'instrument_thickers'})
export class InstrumentThicker{

    @Field()
    @PrimaryGeneratedColumn('uuid', {name: 'instrument_thicker_id'})
    instrumentThickerId: string

    @Field()
    @Column({ name: 'symbol', type: 'varchar', length: 10, unique: true })
    symbol: string

    @Field(() => [Transaction], {nullable: true})
    @OneToMany(() => Transaction, transaction => transaction.instrumentThicker)
    transactions: Transaction[]

}