import { Injectable, OnModuleInit } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class UniswapPriceService implements OnModuleInit {
  private ethUsdcPrice: string | null = null;
  private lastUpdated: number | null = null;
  private cacheDuration = 5000; // 5 seconds (adjust as needed)

  async onModuleInit() {
    await this.updatePrice();
  }

  async findAll() {
    const now = Date.now();
    if (
      this.ethUsdcPrice &&
      this.lastUpdated &&
      now - this.lastUpdated < this.cacheDuration
    ) {
      return { price: this.ethUsdcPrice };
    }

    await this.updatePrice();
    return { price: this.ethUsdcPrice };
  }

  private async updatePrice() {
    try {
      const WEB3_ENDPOINT =
        process.env.ALCHEMY_API_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo'; // **IMPORTANT:** Use environment variable!

      const WETH_ADDRESS = '0xC02aaA39b222e7C6eC85b1D3a68d79f1Ff4a5a2f';
      const USDC_ADDRESS = '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48';
      const ROUTER_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B6B1D2E1B7B8d0D';
      const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B6B1D2E1B7B8d0D';

      const IUniswapV2Factory_ABI = [
        {
          constant: true,
          inputs: [
            {
              internalType: 'address',
              name: 'tokenA',
              type: 'address',
            },
            {
              internalType: 'address',
              name: 'tokenB',
              type: 'address',
            },
          ],
          name: 'getPair',
          outputs: [
            {
              internalType: 'address',
              name: '',
              type: 'address',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];

      const IUniswapV2Router_ABI = [
        {
          constant: true,
          inputs: [
            {
              internalType: 'uint256',
              name: 'amountIn',
              type: 'uint256',
            },
            {
              internalType: 'address[]',
              name: 'path',
              type: 'address[]',
            },
          ],
          name: 'getAmountsOut',
          outputs: [
            {
              internalType: 'uint256[]',
              name: '',
              type: 'uint256[]',
            },
          ],
          payable: false,
          stateMutability: 'view',
          type: 'function',
        },
      ];

      const provider = new ethers.JsonRpcProvider(WEB3_ENDPOINT);

      const factory = new ethers.Contract(
        FACTORY_ADDRESS,
        IUniswapV2Factory_ABI,
        provider,
      );
      const router = new ethers.Contract(
        ROUTER_ADDRESS,
        IUniswapV2Router_ABI,
        provider,
      );

      const wethAddress = ethers.getAddress(WETH_ADDRESS);
      const usdcAddress = ethers.getAddress(USDC_ADDRESS);

      console.log("WETH Address:", wethAddress);
      console.log("USDC Address:", usdcAddress);

      const pairAddress = await factory.getPair(wethAddress, usdcAddress);
      if (pairAddress === ethers.ZeroAddress) {
        throw new Error(
          'Pair address not found. Check token addresses and factory address.',
        );
      }

      const amountIn = ethers.parseUnits('1', 'ether');
      const path = [wethAddress, usdcAddress];

      const amountsOut = await router.getAmountsOut(amountIn, path);
      const price = ethers.formatUnits(amountsOut[1], 6);

      this.ethUsdcPrice = price;
      this.lastUpdated = Date.now();
      console.log('Price updated:', this.ethUsdcPrice);
    } catch (error) {
      console.error('Error updating price:', error);
      this.ethUsdcPrice = null; // Or a default value
      // IMPORTANT: Handle the error appropriately in your application.
      // For example, you might want to throw an exception that your controller can catch
      // and return a specific error response to the client.
      throw error; // Re-throw the error to be handled by the caller
    }
  }
}
