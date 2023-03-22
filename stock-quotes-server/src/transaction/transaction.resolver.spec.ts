import { Test, TestingModule } from '@nestjs/testing';
import { TransactionCreateDTO } from './dto/create-transaction.input';
import { TransactionResolver } from './transaction.resolver';
import { TransactionService } from './transaction.service';

describe('TransactionResolver', () => {
  
  let transactionResolver: TransactionResolver;

  let transactionCreateDTO = new TransactionCreateDTO();
  transactionCreateDTO.price = 1.00;
  transactionCreateDTO.timestamp = new Date(2023, 3, 1, 12, 0);
  transactionCreateDTO.symbol = "symbol";

  const transactionService = {
    create: jest.fn((transaction) => {
      return {
        id: 'fake-transaction-id',
        ...transaction
      };
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionResolver,
        {
          provide: TransactionService,
          useValue: transactionService,
        }
      ],
    }).compile();

    transactionResolver = module.get<TransactionResolver>(TransactionResolver);
  });

  it('TransactionResolver should be defined', () => {
    expect(transactionResolver).toBeDefined();
  });

  it('should have create function', () => {
    expect(transactionResolver.create).toBeDefined();
  })

  it('should create transaction and return with transaction id', async () => {
    expect(await transactionResolver.create(transactionCreateDTO)).toEqual({
      id: "fake-transaction-id",
      ...transactionCreateDTO,
    })
  })
});