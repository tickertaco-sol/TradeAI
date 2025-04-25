import axios from 'axios';
import WebSocket from 'ws';
import { MarketData } from '../types';

export class MarketDataService {
  private wsConnections: Map<string, WebSocket>;
  private priceSubscribers: Map<string, Set<(data: MarketData) => void>>;
  private readonly COINGECKO_API = 'https://api.coingecko.com/api/v3';
  private readonly BINANCE_WS = 'wss://stream.binance.com:9443/ws';

  constructor() {
    this.wsConnections = new Map();
    this.priceSubscribers = new Map();
  }

  async getMarketData(token: string): Promise<MarketData> {
    try {
      const response = await axios.get(`${this.COINGECKO_API}/simple/price`, {
        params: {
          ids: token,
          vs_currencies: 'usd',
          include_24hr_vol: true,
          include_24hr_change: true
        }
      });

      const data = response.data[token];
      return {
        token,
        price: data.usd.toString(),
        volume24h: data.usd_24h_vol.toString(),
        change24h: data.usd_24h_change.toString(),
        timestamp: Date.now()
      };
    } catch (error) {
      console.error('Failed to fetch market data:', error);
      throw error;
    }
  }

  async monitorMarket(tokens: string[]): Promise<void> {
    try {
      // Subscribe to WebSocket feeds for each token
      for (const token of tokens) {
        await this.subscribeToToken(token);
      }
    } catch (error) {
      console.error('Failed to monitor market:', error);
      throw error;
    }
  }

  subscribeToPriceUpdates(token: string, callback: (data: MarketData) => void): void {
    if (!this.priceSubscribers.has(token)) {
      this.priceSubscribers.set(token, new Set());
    }
    this.priceSubscribers.get(token)?.add(callback);
  }

  unsubscribeFromPriceUpdates(token: string, callback: (data: MarketData) => void): void {
    this.priceSubscribers.get(token)?.delete(callback);
  }

  private async subscribeToToken(token: string): Promise<void> {
    if (this.wsConnections.has(token)) {
      return;
    }

    const ws = new WebSocket(`${this.BINANCE_WS}/${token.toLowerCase()}usdt@ticker`);

    ws.on('message', (data: string) => {
      const ticker = JSON.parse(data);
      const marketData: MarketData = {
        token,
        price: ticker.c,
        volume24h: ticker.v,
        change24h: ticker.p,
        timestamp: Date.now()
      };

      // Notify all subscribers
      this.priceSubscribers.get(token)?.forEach(callback => callback(marketData));
    });

    ws.on('error', (error) => {
      console.error(`WebSocket error for ${token}:`, error);
      this.wsConnections.delete(token);
    });

    ws.on('close', () => {
      console.log(`WebSocket connection closed for ${token}`);
      this.wsConnections.delete(token);
    });

    this.wsConnections.set(token, ws);
  }

  private async unsubscribeFromToken(token: string): Promise<void> {
    const ws = this.wsConnections.get(token);
    if (ws) {
      ws.close();
      this.wsConnections.delete(token);
      this.priceSubscribers.delete(token);
    }
  }
} 