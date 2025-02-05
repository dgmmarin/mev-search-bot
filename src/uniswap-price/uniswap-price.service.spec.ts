import { Test, TestingModule } from '@nestjs/testing';
import { UniswapPriceService } from './uniswap-price.service';

describe('UniswapPriceService', () => {
  let service: UniswapPriceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UniswapPriceService],
    }).compile();

    service = module.get<UniswapPriceService>(UniswapPriceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
