# Trading Actions API Reference

This document provides detailed information about the trading actions available in the TradeAI plugin.

## executeTrade

Executes a trade on the specified network.

### Parameters

```typescript
{
  network: 'ethereum' | 'solana';
  type: 'buy' | 'sell';
  token: string;
  amount: string;
  price: string;
}
```

### Returns

```typescript
{
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
```

### Example

```typescript
const trade = await agent.executeAction('executeTrade', {
  network: 'ethereum',
  type: 'buy',
  token: 'ETH',
  amount: '0.1',
  price: '2000'
});
```

### Error Handling

- `InvalidNetworkError`: When the specified network is not supported
- `InvalidTradeTypeError`: When the trade type is invalid
- `InvalidAmountError`: When the amount is invalid or exceeds limits
- `InsufficientFundsError`: When there are insufficient funds for the trade
- `NetworkError`: When there's an issue with the network connection

## getMarketData

Fetches real-time market data for a specific token.

### Parameters

```typescript
{
  token: string;
}
```

### Returns

```typescript
{
  token: string;
  price: string;
  volume24h: string;
  change24h: string;
  timestamp: number;
}
```

### Example

```typescript
const marketData = await agent.executeAction('getMarketData', {
  token: 'ethereum'
});
```

### Error Handling

- `InvalidTokenError`: When the token is not supported
- `MarketDataError`: When there's an issue fetching market data
- `RateLimitError`: When the API rate limit is exceeded

## getPortfolio

Gets the current portfolio status for a specific network.

### Parameters

```typescript
{
  network: 'ethereum' | 'solana';
}
```

### Returns

```typescript
{
  network: 'ethereum' | 'solana';
  tokens: {
    [token: string]: {
      balance: string;
      value: string;
    };
  };
  totalValue: string;
}
```

### Example

```typescript
const portfolio = await agent.executeAction('getPortfolio', {
  network: 'ethereum'
});
```

### Error Handling

- `InvalidNetworkError`: When the specified network is not supported
- `PortfolioError`: When there's an issue fetching portfolio data
- `NetworkError`: When there's an issue with the network connection

## setTradingStrategy

Configures trading strategy parameters.

### Parameters

```typescript
{
  id: string;
  name: string;
  description?: string;
  parameters: {
    [key: string]: any;
  };
  active: boolean;
}
```

### Returns

```typescript
void
```

### Example

```typescript
await agent.executeAction('setTradingStrategy', {
  id: 'strategy-1',
  name: 'ETH Stop Loss',
  parameters: {
    token: 'ETH',
    stopLoss: 1800,
    takeProfit: 2200
  },
  active: true
});
```

### Error Handling

- `InvalidStrategyError`: When the strategy parameters are invalid
- `StrategyError`: When there's an issue setting up the strategy
- `DuplicateStrategyError`: When a strategy with the same ID already exists

## monitorMarket

Sets up market monitoring and alerts for specified tokens.

### Parameters

```typescript
{
  tokens: string[];
}
```

### Returns

```typescript
void
```

### Example

```typescript
await agent.executeAction('monitorMarket', {
  tokens: ['ethereum', 'solana', 'bitcoin']
});
```

### Error Handling

- `InvalidTokenError`: When any of the specified tokens are not supported
- `MonitoringError`: When there's an issue setting up market monitoring
- `RateLimitError`: When the API rate limit is exceeded

## Best Practices

1. **Error Handling**
   - Always implement proper error handling for all trading actions
   - Use try-catch blocks to handle potential errors
   - Log errors for debugging purposes

2. **Rate Limiting**
   - Be mindful of API rate limits
   - Implement appropriate delays between requests
   - Use WebSocket connections for real-time data when possible

3. **Security**
   - Never expose private keys in your code
   - Use environment variables for sensitive information
   - Implement proper validation for all parameters

4. **Performance**
   - Cache market data when appropriate
   - Use batch requests when possible
   - Implement proper connection pooling

## Rate Limits

- Market Data API: 50 requests per minute
- Trading API: 10 requests per minute
- Portfolio API: 20 requests per minute

## WebSocket Events

The plugin also supports WebSocket events for real-time updates:

```typescript
// Subscribe to price updates
agent.on('priceUpdate', (data) => {
  console.log('Price update:', data);
});

// Subscribe to trade updates
agent.on('tradeUpdate', (data) => {
  console.log('Trade update:', data);
});

// Subscribe to portfolio updates
agent.on('portfolioUpdate', (data) => {
  console.log('Portfolio update:', data);
});
```

## Testing

You can test the trading actions using the mock environment:

```typescript
// Enable mock mode
process.env.TRADEAI_MOCK = 'true';

// Execute test trade
const trade = await agent.executeAction('executeTrade', {
  network: 'ethereum',
  type: 'buy',
  token: 'ETH',
  amount: '0.1',
  price: '2000'
});
```

## Related Documentation

- [Market Data API](../api-reference/market-data.md)
- [Portfolio Management API](../api-reference/portfolio-management.md)
- [Risk Management API](../api-reference/risk-management.md)
- [Security Best Practices](../security/best-practices.md) 