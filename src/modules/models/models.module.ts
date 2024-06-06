import { Module } from '@nestjs/common';
import { ModelsService } from './models.service';
import { ModelsController } from './models.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Model } from './entities/model.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Model])],
  providers: [ModelsService],
  controllers: [ModelsController],
  exports: [ModelsService]
})
export class ModelsModule {}
