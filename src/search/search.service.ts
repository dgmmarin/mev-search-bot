import { Injectable } from '@nestjs/common';
import { CreateSearchDto } from './dto/create-search.dto';
import { UpdateSearchDto } from './dto/update-search.dto';
import { ethers } from 'ethers';

import {
  CONTRACT_ADDRESS,
  FACTORY_ADDRESS,
  IUniswapV2Factory_ABI,
  IUniswapV2Pair_ABI,
  PRIVATE_KEY,
  TOKEN_A,
  TOKEN_B,
  WEB3_ENDPOINT,
} from './constants';

@Injectable()
export class SearchService {
  create(createSearchDto: CreateSearchDto) {
    return 'This action adds a new search';
  }

  async findAll() {
    // Initialize provider
    const provider = new ethers.JsonRpcProvider(WEB3_ENDPOINT);
    const factory = new ethers.Contract(
      FACTORY_ADDRESS, // No need for ethers.getAddress unless it's checksummed
      IUniswapV2Factory_ABI,
      provider,
    );

    const pairAddress = await factory.getPair(TOKEN_A, TOKEN_B);
    if (pairAddress === ethers.ZeroAddress) {
      throw new Error('Pair not found for the given tokens.');
    }

    const pairContract = new ethers.Contract(
      pairAddress,
      IUniswapV2Pair_ABI,
      provider,
    );

    // Get reserves
    const [reserve0, reserve1, blockTimestampLast] =
      await pairContract.getReserves();

    // Convert reserves to BigInt (Ethers v6 uses BigInt instead of BigNumber)
    const reserveA = BigInt(reserve0);
    const reserveB = BigInt(reserve1);

    console.log('Reserve 0:', reserveA.toString());
    console.log('Reserve 1:', reserveB.toString());
    console.log('Last Updated Block Timestamp:', blockTimestampLast.toString());

    // Use `>` instead of `.gt()`
    if (reserveB > 0n) {
      console.log('Reserve B is greater than 0');
    }
    return `This action returns all search`;
  }

  async getDexPrice(
    provider: ethers.JsonRpcProvider,
    factory: ethers.Contract,
    tokenA: string,
    tokenB: string,
  ): Promise<number | null> {
    const pairAddress = await factory.getPair(tokenA, tokenB);
    if (pairAddress !== ethers.ZeroAddress) {
      const pair = new ethers.Contract(
        pairAddress,
        IUniswapV2Pair_ABI,
        provider,
      );
      const reserves = await pair.getReserves();
      const reserveA = reserves[0];
      const reserveB = reserves[1];

      if (reserveB.gt(0)) {
        // More robust calculation to avoid precision loss:
        const price = reserveA
          .mul(ethers.parseUnits('1', 'ether'))
          .div(reserveB); // Calculate price with BigNumbers

        // Convert to a number with limited decimals (adjust as needed):
        const priceNumber = parseFloat(ethers.formatUnits(price, 'ether')); // Format to string with decimals
        return priceNumber;
      }
    }
    return null;
  }

  findOne(id: number) {
    return `This action returns a #${id} search`;
  }

  update(id: number, updateSearchDto: UpdateSearchDto) {
    return `This action updates a #${id} search`;
  }

  remove(id: number) {
    return `This action removes a #${id} search`;
  }
}
