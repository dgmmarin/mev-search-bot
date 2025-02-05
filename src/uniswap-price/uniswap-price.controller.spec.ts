import { Test, TestingModule } from '@nestjs/testing';
import { UniswapPriceController } from './uniswap-price.controller';
import { UniswapPriceService } from './uniswap-price.service';

describe('UniswapPriceController', () => {
  let controller: UniswapPriceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UniswapPriceController],
      providers: [UniswapPriceService],
    }).compile();

    controller = module.get<UniswapPriceController>(UniswapPriceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
