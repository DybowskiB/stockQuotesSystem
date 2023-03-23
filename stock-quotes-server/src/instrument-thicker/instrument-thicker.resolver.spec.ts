import { Test, TestingModule } from '@nestjs/testing';
import { InstrumentThickerCreateDTO } from './dto/create-instrument-thicker.input';
import { InstrumentThickerResolver } from './instrument-thicker.resolver';
import { InstrumentThickerService } from './instrument-thicker.service';

describe('InstrumentThickerResolver', () => {
  
  let instrumentThickerResolver: InstrumentThickerResolver;

  let instrumentThickerDTO = new InstrumentThickerCreateDTO();
  instrumentThickerDTO.symbol = "symbol";

  const instrumentThickerService = {
    create: jest.fn((instrumentThicker) => {
      return {
        id: 'fake-instrument-thicker-id',
        ...instrumentThicker
      };
    })
  }
  
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InstrumentThickerResolver,
        {
          provide: InstrumentThickerService,
          useValue: instrumentThickerService,
        }
    ],
    }).compile();

    instrumentThickerResolver = module.get<InstrumentThickerResolver>(InstrumentThickerResolver);
  });

  it('should be defined', () => {
    expect(instrumentThickerResolver).toBeDefined();
  });

});