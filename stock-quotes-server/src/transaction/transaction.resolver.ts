import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import { TransactionCreateDTO } from './dto/create-transaction.input';

@Resolver(() => Transaction)
export class TransactionResolver {

    constructor(private transactionService: TransactionService) { }

    @Query(() => [Transaction], { name: "getAllTransactions" })
    findAll() {
        return this.transactionService.findAll();
    }

    @Mutation( () => Transaction, {name: 'createTransaction'})
    create(@Args('transactionInput') transaction : TransactionCreateDTO){
        return this.transactionService.create(transaction);
    }

}
