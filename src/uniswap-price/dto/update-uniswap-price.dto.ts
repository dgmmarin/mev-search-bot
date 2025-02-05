import { PartialType } from '@nestjs/mapped-types';
import { CreateUniswapPriceDto } from './create-uniswap-price.dto';

export class UpdateUniswapPriceDto extends PartialType(CreateUniswapPriceDto) {}
