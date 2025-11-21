import { Test, TestingModule } from '@nestjs/testing';
import { NeedController } from './need.controller';
import { NeedService } from './need.service';

describe('NeedController', () => {
  let controller: NeedController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NeedController],
      providers: [NeedService],
    }).compile();

    controller = module.get<NeedController>(NeedController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
