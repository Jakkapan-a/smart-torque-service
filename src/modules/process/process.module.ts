import { Module } from '@nestjs/common';
import { ProcessController } from './process.controller';
import { ProcessService } from './process.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from '../models/entities/model.entity';
import { Sequence } from '../sequence/entities/sequence.entity';
import { Process } from './entities/process.entity';
import { History } from '../history/entities/history.entity';
import { ModelsService } from '../models/models.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Model,Sequence,Process,History]),
    
  ],
  controllers: [ProcessController],
  providers: [ProcessService,ModelsService]
})
export class ProcessModule {}
