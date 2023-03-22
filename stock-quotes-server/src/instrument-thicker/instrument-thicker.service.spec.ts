import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { InstrumentThickerCreateDTO } from './dto/create-instrument-thicker.input';
import { InstrumentThicker } from './entities/instrument-thicker.entity';
import { InstrumentThickerService } from './instrument-thicker.service';

describe('InstrumentThickerService', () => {

  let instrumentThickerService: InstrumentThickerService;

  let instrumentThickerRepository = {
    create: jest.fn((iT) => iT),
    save: jest.fn((instrumentThicker) => 
      Promise.resolve({
        id: 'fake-instrument-thicker-id',
        ...instrumentThicker,
      })
    ),
    findOne: jest.fn((arg) => {
      if(arg.where.symbol === 'symbol'){
        return Promise.resolve({
          id: 'fake-instrument-thicker-id',
          symbol: 'symbol',
        })
      }
      return null;
    })
  }

  // Existing instrument thicker
  let instrumentThickerCreateDTO1 = new InstrumentThickerCreateDTO();
  instrumentThickerCreateDTO1.symbol = 'symbol';

  // Non-existent intrument thicker
  let instrumentThickerCreateDTO2 = new InstrumentThickerCreateDTO();
  instrumentThickerCreateDTO2.symbol = 'none';

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentThickerService,
        {
          provide: getRepositoryToken(InstrumentThicker),
          useValue: instrumentThickerRepository,
        },
    ],
    }).compile();

    instrumentThickerService = module.get<InstrumentThickerService>(InstrumentThickerService);
  });

  it('InstrumentThickerService should be defined', () => {
    expect(instrumentThickerService).toBeDefined();
  });

  it('should have create function', () => {
    expect(instrumentThickerService.create).toBeDefined();
  })

  it('should have findOneBySymbol function', () => {
    expect(instrumentThickerService.findOneBySymbol).toBeDefined();
  })

  it('should create new instrument thicker and return with instrument thicker id' , async () => {
    expect(await instrumentThickerService.create(instrumentThickerCreateDTO1)).toEqual({
      id: 'fake-instrument-thicker-id',
      ...instrumentThickerCreateDTO1,
    })
  })

  it('should find existing instrument thicker', async () => {
    expect(await instrumentThickerService.findOneBySymbol(instrumentThickerCreateDTO1.symbol)).toEqual({
      id: 'fake-instrument-thicker-id',
      ...instrumentThickerCreateDTO1,
    })
  })

  it('should return null if instrument thicker is not found', async () => {
    expect(await instrumentThickerService.findOneBySymbol(instrumentThickerCreateDTO2.symbol) === null);
  })

});