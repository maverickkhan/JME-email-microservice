import { Test, TestingModule } from '@nestjs/testing';
import { BellAlertController } from './bell-alert.controller';
import { BellAlertService } from './bell-alert.service';

describe('BellAlertController', () => {
  let controller: BellAlertController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BellAlertController],
      providers: [BellAlertService],
    }).compile();

    controller = module.get<BellAlertController>(BellAlertController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
