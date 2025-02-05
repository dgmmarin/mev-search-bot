// Replace with your Infura or Alchemy endpoint
const WEB3_ENDPOINT = 'https://eth-mainnet.g.alchemy.com/v2/demo';

// Replace with your contract address and ABI
const CONTRACT_ADDRESS = 'YOUR_CONTRACT_ADDRESS';
const CONTRACT_ABI: any = [
  // ... (Your contract ABI here) ...
];

// Replace with your private key (securely store this!)
const PRIVATE_KEY = 'YOUR_PRIVATE_KEY';

// DEX Router and Factory Addresses (example: Uniswap V2)
const ROUTER_ADDRESS = '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D';
const FACTORY_ADDRESS = '0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f';
const WETH_ADDRESS = '0x7cfB79a566247765A927259A281c7f606Ab02b58';

// Tokens to consider for arbitrage
const TOKEN_A = '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599';
const TOKEN_B = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48';

// Uniswap V2 ABIs (you can put these in separate files)
const IUniswapV2Factory_ABI = [
  {
    constant: true,
    inputs: [
      { name: 'tokenA', type: 'address' },
      { name: 'tokenB', type: 'address' },
    ],
    name: 'getPair',
    outputs: [{ name: 'pair', type: 'address' }],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

const IUniswapV2Pair_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'getReserves',
    outputs: [
      { name: 'reserve0', type: 'uint112' },
      { name: 'reserve1', type: 'uint112' },
      { name: 'blockTimestampLast', type: 'uint32' },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
];

export {
  WEB3_ENDPOINT,
  CONTRACT_ADDRESS,
  CONTRACT_ABI,
  PRIVATE_KEY,
  ROUTER_ADDRESS,
  FACTORY_ADDRESS,
  WETH_ADDRESS,
  TOKEN_A,
  TOKEN_B,
  IUniswapV2Factory_ABI,
  IUniswapV2Pair_ABI,
};
