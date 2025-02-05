import { Module } from '@nestjs/common';
import { UniswapPriceService } from './uniswap-price.service';
import { UniswapPriceController } from './uniswap-price.controller';

@Module({
  controllers: [UniswapPriceController],
  providers: [UniswapPriceService],
})
export class UniswapPriceModule {}
