import { Module } from '@nestjs/common';
import { CardRfidController } from './card-rfid.controller';
import { CardRfidService } from './card-rfid.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardRfid } from './entities/card-rfid.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CardRfid]),
  ],
  controllers: [CardRfidController],
  providers: [CardRfidService]
})
export class CardRfidModule {}
