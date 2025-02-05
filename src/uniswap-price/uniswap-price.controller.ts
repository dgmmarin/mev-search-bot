import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UniswapPriceService } from './uniswap-price.service';
import { CreateUniswapPriceDto } from './dto/create-uniswap-price.dto';
import { UpdateUniswapPriceDto } from './dto/update-uniswap-price.dto';

@Controller('uniswap-price')
export class UniswapPriceController {
  constructor(private readonly uniswapPriceService: UniswapPriceService) { }
  @Get()
  findAll() {
    return this.uniswapPriceService.findAll();
  }
}
