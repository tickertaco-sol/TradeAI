# Market Data API Reference

This document provides detailed information about the market data functionality available in the TradeAI plugin.

## Overview

The Market Data API provides access to real-time and historical market data for various cryptocurrencies. It supports multiple data sources and provides a unified interface for accessing market information.

## Data Sources

TradeAI integrates with multiple market data providers:

- CoinGecko API
- Binance WebSocket
- (More providers coming soon)

## API Endpoints

### getMarketData

Fetches real-time market data for a specific token.

#### Parameters

```typescript
{
  token: string;
}
```

#### Returns

```typescript
{
  token: string;
  price: string;
  volume24h: string;
  change24h: string;
  timestamp: number;
}
```

#### Example

```typescript
const marketData = await agent.executeAction('getMarketData', {
  token: 'ethereum'
});
```

### getHistoricalData

Fetches historical market data for a specific token.

#### Parameters

```typescript
{
  token: string;
  timeframe: '1h' | '4h' | '1d' | '1w' | '1m';
  limit: number;
}
```

#### Returns

```typescript
{
  token: string;
  timeframe: string;
  data: Array<{
    timestamp: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
  }>;
}
```

#### Example

```typescript
const historicalData = await agent.executeAction('getHistoricalData', {
  token: 'ethereum',
  timeframe: '1d',
  limit: 30
});
```

### getMarketDepth

Fetches order book depth for a specific token.

#### Parameters

```typescript
{
  token: string;
  limit: number;
}
```

#### Returns

```typescript
{
  token: string;
  timestamp: number;
  bids: Array<[string, string]>; // [price, amount]
  asks: Array<[string, string]>; // [price, amount]
}
```

#### Example

```typescript
const marketDepth = await agent.executeAction('getMarketDepth', {
  token: 'ethereum',
  limit: 10
});
```

### getMarketTrades

Fetches recent trades for a specific token.

#### Parameters

```typescript
{
  token: string;
  limit: number;
}
```

#### Returns

```typescript
{
  token: string;
  trades: Array<{
    id: string;
    timestamp: number;
    price: string;
    amount: string;
    side: 'buy' | 'sell';
  }>;
}
```

#### Example

```typescript
const marketTrades = await agent.executeAction('getMarketTrades', {
  token: 'ethereum',
  limit: 50
});
```

## WebSocket Events

The Market Data API supports real-time updates through WebSocket connections:

### Price Updates

```typescript
agent.on('priceUpdate', (data) => {
  console.log('Price update:', data);
});
```

### Trade Updates

```typescript
agent.on('tradeUpdate', (data) => {
  console.log('Trade update:', data);
});
```

### Order Book Updates

```typescript
agent.on('orderBookUpdate', (data) => {
  console.log('Order book update:', data);
});
```

## Data Caching

The Market Data API implements caching to improve performance and reduce API calls:

- Price data is cached for 1 minute
- Historical data is cached for 5 minutes
- Market depth is cached for 30 seconds
- Trade data is not cached

## Rate Limits

- CoinGecko API: 50 requests per minute
- Binance API: 1200 requests per minute
- WebSocket connections: Unlimited

## Error Handling

Common errors and their handling:

### InvalidTokenError

```typescript
try {
  const marketData = await agent.executeAction('getMarketData', {
    token: 'invalid-token'
  });
} catch (error) {
  if (error instanceof InvalidTokenError) {
    console.error('Invalid token:', error.message);
  }
}
```

### RateLimitError

```typescript
try {
  const marketData = await agent.executeAction('getMarketData', {
    token: 'ethereum'
  });
} catch (error) {
  if (error instanceof RateLimitError) {
    console.error('Rate limit exceeded:', error.message);
    // Implement retry logic with exponential backoff
  }
}
```

### NetworkError

```typescript
try {
  const marketData = await agent.executeAction('getMarketData', {
    token: 'ethereum'
  });
} catch (error) {
  if (error instanceof NetworkError) {
    console.error('Network error:', error.message);
    // Implement retry logic
  }
}
```

## Best Practices

1. **Error Handling**
   - Always implement proper error handling
   - Use try-catch blocks for all API calls
   - Implement retry logic for transient errors

2. **Rate Limiting**
   - Be mindful of API rate limits
   - Implement appropriate delays between requests
   - Use WebSocket connections for real-time data

3. **Caching**
   - Use cached data when appropriate
   - Implement your own caching layer if needed
   - Clear cache when data becomes stale

4. **Performance**
   - Use WebSocket connections for real-time data
   - Implement batch requests when possible
   - Use appropriate timeframes for historical data

## Testing

You can test the Market Data API using the mock environment:

```typescript
// Enable mock mode
process.env.TRADEAI_MOCK = 'true';

// Get mock market data
const marketData = await agent.executeAction('getMarketData', {
  token: 'ethereum'
});
```

## Related Documentation

- [Trading Actions API](../api-reference/trading-actions.md)
- [Portfolio Management API](../api-reference/portfolio-management.md)
- [Risk Management API](../api-reference/risk-management.md)
- [Security Best Practices](../security/best-practices.md) 