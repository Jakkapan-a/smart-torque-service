import { Module } from '@nestjs/common';
import { CardRfidController } from './card-rfid.controller';
import { CardRfidService } from './card-rfid.service';

@Module({
  controllers: [CardRfidController],
  providers: [CardRfidService]
})
export class CardRfidModule {}
