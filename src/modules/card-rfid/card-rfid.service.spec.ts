import { Test, TestingModule } from '@nestjs/testing';
import { CardRfidService } from './card-rfid.service';

describe('CardRfidService', () => {
  let service: CardRfidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardRfidService],
    }).compile();

    service = module.get<CardRfidService>(CardRfidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
