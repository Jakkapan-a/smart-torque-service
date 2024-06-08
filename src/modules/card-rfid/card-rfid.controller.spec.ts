import { Test, TestingModule } from '@nestjs/testing';
import { CardRfidController } from './card-rfid.controller';

describe('CardRfidController', () => {
  let controller: CardRfidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardRfidController],
    }).compile();

    controller = module.get<CardRfidController>(CardRfidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
