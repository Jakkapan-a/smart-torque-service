import { Module } from '@nestjs/common';
import { SequenceController } from './sequence.controller';
import { SequenceService } from './sequence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sequence } from './entities/sequence.entity';
import { Model } from '../models/entities/model.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Sequence,Model]),
  ],
  providers: [SequenceService],
  controllers: [SequenceController],
  exports: [SequenceService],
})
export class SequenceModule {
  constructor() {
    console.log('SequenceModule loaded');
  }
}
