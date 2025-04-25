import { Trade, TradeAIConfig, Portfolio } from '../types';
import { MarketDataService } from './market-data.service';
import { PortfolioService } from './portfolio.service';

export class RiskManagementService {
  private config: TradeAIConfig;
  private marketDataService: MarketDataService;
  private portfolioService: PortfolioService;
  private activeStopLosses: Map<string, { price: number; type: 'buy' | 'sell' }>;
  private activeTakeProfits: Map<string, { price: number; type: 'buy' | 'sell' }>;

  constructor() {
    this.config = {
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
    this.marketDataService = new MarketDataService();
    this.portfolioService = new PortfolioService();
    this.activeStopLosses = new Map();
    this.activeTakeProfits = new Map();
  }

  async validateTrade(trade: Omit<Trade, 'id' | 'status' | 'timestamp'>): Promise<boolean> {
    try {
      // Check position size
      if (!this.validatePositionSize(trade)) {
        return false;
      }

      // Check portfolio exposure
      if (!await this.validatePortfolioExposure(trade)) {
        return false;
      }

      // Check market conditions
      if (!await this.validateMarketConditions(trade)) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Trade validation failed:', error);
      return false;
    }
  }

  async setStopLoss(token: string, price: number, type: 'buy' | 'sell'): Promise<void> {
    this.activeStopLosses.set(token, { price, type });
  }

  async setTakeProfit(token: string, price: number, type: 'buy' | 'sell'): Promise<void> {
    this.activeTakeProfits.set(token, { price, type });
  }

  async checkRiskLevels(token: string, currentPrice: number): Promise<{ stopLoss: boolean; takeProfit: boolean }> {
    const stopLoss = this.activeStopLosses.get(token);
    const takeProfit = this.activeTakeProfits.get(token);

    return {
      stopLoss: stopLoss ? this.checkStopLoss(currentPrice, stopLoss) : false,
      takeProfit: takeProfit ? this.checkTakeProfit(currentPrice, takeProfit) : false
    };
  }

  private validatePositionSize(trade: Omit<Trade, 'id' | 'status' | 'timestamp'>): boolean {
    const amount = parseFloat(trade.amount);
    return amount <= this.config.riskManagement.maxPositionSize;
  }

  private async validatePortfolioExposure(trade: Omit<Trade, 'id' | 'status' | 'timestamp'>): Promise<boolean> {
    const portfolio = await this.portfolioService.getPortfolio(trade.network);
    const totalValue = parseFloat(portfolio.totalValue);
    const tradeValue = parseFloat(trade.amount) * parseFloat(trade.price);

    // Ensure trade doesn't exceed 20% of portfolio value
    return tradeValue <= totalValue * 0.2;
  }

  private async validateMarketConditions(trade: Omit<Trade, 'id' | 'status' | 'timestamp'>): Promise<boolean> {
    const marketData = await this.marketDataService.getMarketData(trade.token);
    const priceChange = parseFloat(marketData.change24h);

    // Don't trade if market is too volatile (more than 10% change in 24h)
    if (Math.abs(priceChange) > 10) {
      return false;
    }

    return true;
  }

  private checkStopLoss(currentPrice: number, stopLoss: { price: number; type: 'buy' | 'sell' }): boolean {
    if (stopLoss.type === 'buy') {
      return currentPrice <= stopLoss.price;
    } else {
      return currentPrice >= stopLoss.price;
    }
  }

  private checkTakeProfit(currentPrice: number, takeProfit: { price: number; type: 'buy' | 'sell' }): boolean {
    if (takeProfit.type === 'buy') {
      return currentPrice >= takeProfit.price;
    } else {
      return currentPrice <= takeProfit.price;
    }
  }
} 