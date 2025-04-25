import { Plugin } from '@elizaos/core';

export interface NetworkConfig {
  rpcUrl: string;
  chainId?: number;
}

export interface TradingConfig {
  maxSlippage: number;
  gasLimit: number;
  timeout: number;
}

export interface RiskManagementConfig {
  maxPositionSize: number;
  stopLoss: number;
  takeProfit: number;
}

export interface TradeAIConfig {
  networks: {
    ethereum?: NetworkConfig;
    solana?: NetworkConfig;
  };
  trading: TradingConfig;
  riskManagement: RiskManagementConfig;
}

export interface Trade {
  id: string;
  network: 'ethereum' | 'solana';
  type: 'buy' | 'sell';
  token: string;
  amount: string;
  price: string;
  timestamp: number;
  status: 'pending' | 'completed' | 'failed';
  txHash?: string;
}

export interface Portfolio {
  network: 'ethereum' | 'solana';
  tokens: {
    [token: string]: {
      balance: string;
      value: string;
    };
  };
  totalValue: string;
}

export interface MarketData {
  token: string;
  price: string;
  volume24h: string;
  change24h: string;
  timestamp: number;
}

export interface TradingStrategy {
  id: string;
  name: string;
  description: string;
  parameters: {
    [key: string]: any;
  };
  active: boolean;
}

export interface TradeAIPlugin extends Plugin {
  name: 'tradeai';
  version: string;
  description: string;
  config: TradeAIConfig;
}

export interface TradingService {
  executeTrade(trade: Omit<Trade, 'id' | 'status' | 'timestamp'>): Promise<Trade>;
  getPortfolio(network: 'ethereum' | 'solana'): Promise<Portfolio>;
  getMarketData(token: string): Promise<MarketData>;
  setTradingStrategy(strategy: TradingStrategy): Promise<void>;
  monitorMarket(tokens: string[]): Promise<void>;
} 