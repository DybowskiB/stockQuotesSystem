import { Module } from '@nestjs/common';
import { InstrumentThickerResolver } from './instrument-thicker.resolver';
import { InstrumentThickerService } from './instrument-thicker.service';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { InstrumentThicker } from './entities/instrument-thicker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InstrumentThicker])],
  providers: [InstrumentThickerService, InstrumentThickerResolver]
})
export class InstrumentThickerModule {}
