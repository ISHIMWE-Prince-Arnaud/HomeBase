import { Test, TestingModule } from '@nestjs/testing';
import { NeedService } from './need.service';

describe('NeedService', () => {
  let service: NeedService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NeedService],
    }).compile();

    service = module.get<NeedService>(NeedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
