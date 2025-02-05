import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchModule } from './search/search.module';
import { UniswapPriceModule } from './uniswap-price/uniswap-price.module';

@Module({
  imports: [SearchModule, UniswapPriceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
