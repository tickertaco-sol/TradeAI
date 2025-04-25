import { Plugin } from '@elizaos/core';
import { TradeAIPlugin, TradeAIConfig } from './types';
import { TradingService } from './services/trading.service';
import { MarketDataService } from './services/market-data.service';
import { PortfolioService } from './services/portfolio.service';
import { RiskManagementService } from './services/risk-management.service';

// Default configuration
const defaultConfig: TradeAIConfig = {
  networks: {
    ethereum: {
      rpcUrl: process.env.ETHEREUM_RPC_URL || '',
      chainId: 1
    },
    solana: {
      rpcUrl: process.env.SOLANA_RPC_URL || ''
    }
  },
  trading: {
    maxSlippage: 0.5,
    gasLimit: 300000,
    timeout: 30000
  },
  riskManagement: {
    maxPositionSize: 1000,
    stopLoss: 5,
    takeProfit: 10
  }
};

// Initialize services
const tradingService = new TradingService();
const marketDataService = new MarketDataService();
const portfolioService = new PortfolioService();
const riskManagementService = new RiskManagementService();

export const tradeAIPlugin: TradeAIPlugin = {
  name: 'tradeai',
  version: '0.1.0',
  description: 'A powerful plugin for Eliza that enables AI agents to perform on-chain trading operations',
  config: defaultConfig,
  actions: [
    {
      name: 'executeTrade',
      description: 'Execute a trade on the specified network',
      handler: async (params) => {
        return tradingService.executeTrade(params);
      }
    },
    {
      name: 'getMarketData',
      description: 'Fetch real-time market data',
      handler: async (params) => {
        return marketDataService.getMarketData(params.token);
      }
    },
    {
      name: 'getPortfolio',
      description: 'Get current portfolio status',
      handler: async (params) => {
        return portfolioService.getPortfolio(params.network);
      }
    },
    {
      name: 'setTradingStrategy',
      description: 'Configure trading strategy parameters',
      handler: async (params) => {
        return tradingService.setTradingStrategy(params);
      }
    },
    {
      name: 'monitorMarket',
      description: 'Set up market monitoring and alerts',
      handler: async (params) => {
        return marketDataService.monitorMarket(params.tokens);
      }
    }
  ],
  services: [
    tradingService,
    marketDataService,
    portfolioService,
    riskManagementService
  ]
};

export default tradeAIPlugin; 