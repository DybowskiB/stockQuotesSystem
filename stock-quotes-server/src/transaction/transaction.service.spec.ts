import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InstrumentThickerService } from '../../src/instrument-thicker/instrument-thicker.service';
import { TransactionCreateDTO } from './dto/create-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { TransactionService } from './transaction.service';
import ormconfig from '../../orm.config';
import { InstrumentThicker } from '../../src/instrument-thicker/entities/instrument-thicker.entity';

describe('TransactionService', () => {
  
  let transactionService: TransactionService;
  let instrumentThickerService = {
    findOneBySymbol: jest.fn((symbol) => {
      if (symbol === 'exist') {
        return Promise.resolve({
          id: 'fake-intrument-thicker-id',
          symbol: 'exist',
        })
      }
      return null;
    }),
    create: jest.fn(() =>
      Promise.resolve({
        id: 'fake-instrument-thicker-id',
        symbol: 'new',
      })
    )
  };

  let transactionRepository = {
    create: jest.fn((t) => t),
    save: jest.fn((transaction) => 
      Promise.resolve({
        id: 'fake-transaction-id',
        ...transaction,
      })
    ),
  }

  // TrasactionCreateDto object with an existing instrument thicker symbol
  let transactionCreateDTO1 = new TransactionCreateDTO();
  transactionCreateDTO1.price = 1.00;
  transactionCreateDTO1.timestamp = new Date(2023, 3, 1, 12, 0);
  transactionCreateDTO1.symbol = 'exist';

  // TrasactionCreateDto object with a new, nonexistent in db instrument thicker symbol
  let transactionCreateDTO2 = new TransactionCreateDTO();
  transactionCreateDTO2.price = 1.00;
  transactionCreateDTO2.timestamp = new Date(2023, 3, 1, 12, 0);
  transactionCreateDTO2.symbol = 'new';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransactionService,
        {
          provide: getRepositoryToken(Transaction),
          useValue: transactionRepository,
        },
        {
          provide: InstrumentThickerService,
          useValue: instrumentThickerService,
        },
      ],
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionService).toBeDefined();
  });

  it('should have create function', () => {
    expect(transactionService.create).toBeDefined();
  })

  it('should create new transaction and return with transaction id', async () => {
    expect(await transactionService.create(transactionCreateDTO1)).toEqual({
      id: "fake-transaction-id",
      ...transactionCreateDTO1,
    })
  })

  it('should create new transaction with existing instrument thicker', async () => {
    let transaction = await transactionService.create(transactionCreateDTO1)
    expect(transaction.instrumentThicker.symbol === transactionCreateDTO1.symbol)
  })

  it('should create new transaction with a new, nonexistent instrument thicker', async () => {
    let transaction = await transactionService.create(transactionCreateDTO2)
    expect(transaction.instrumentThicker.symbol === transactionCreateDTO2.symbol)
  })

});

describe('TransactionService with DB', () => {
  let transactionService: TransactionService;
  let module: TestingModule;

  let transactionCreateDTO = new TransactionCreateDTO();
  transactionCreateDTO.price = 1.00;
  transactionCreateDTO.timestamp = new Date(2023, 3, 1, 12, 0);
  transactionCreateDTO.symbol = 'new';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot(ormconfig),
        TypeOrmModule.forFeature([Transaction, InstrumentThicker])
      ],
      providers: [TransactionService, InstrumentThickerService, Repository<Transaction>]
    }).compile();

    transactionService = module.get<TransactionService>(TransactionService);
  });

  afterAll(async () => {
    module.close();
  });

  it("should be defined", () => {
    expect(transactionService).toBeDefined();
  });

  it("should't return error when many concurrent requests attempt to add quotes for the same ticker that doesn't yet exist in the database",
    async () => {
      let transactions = [];
      let numOfTransactions = 20;

      for (let i = 0; i < numOfTransactions; ++i) {
        transactions.push(transactionService.create(transactionCreateDTO))
      }

      for (let i = 0; i < numOfTransactions; ++i) {
        await expect(transactions[i]).resolves.toBeDefined();
      }

    })
});