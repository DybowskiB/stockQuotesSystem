import { Field, ObjectType } from "@nestjs/graphql/dist/decorators"
import { Entity, PrimaryGeneratedColumn, Column, Unique } from "typeorm"

@ObjectType()
@Entity({ name: 'InstrumentThickers'})
export class InstrumentThicker{

    @Field()
    @PrimaryGeneratedColumn('uuid')
    instrument_thicker_id: string

    @Field()
    @Column({ name: 'symbol', type: 'varchar', length: 10, unique: true })
    symbol: string

}