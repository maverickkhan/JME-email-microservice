import { Test, TestingModule } from '@nestjs/testing';
import { BellAlertService } from './bell-alert.service';

describe('BellAlertService', () => {
  let service: BellAlertService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BellAlertService],
    }).compile();

    service = module.get<BellAlertService>(BellAlertService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
