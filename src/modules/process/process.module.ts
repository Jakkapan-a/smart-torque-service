import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from '../models/entities/model.entity';
import { Sequence } from '../sequence/entities/sequence.entity';
import { Process } from './entities/process.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model,Sequence,Process])
  ],
  controllers: [ProcessController],
  providers: [ProcessService]
})
export class ProcessModule {}
