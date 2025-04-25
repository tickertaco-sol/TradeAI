# Quick Start Guide

This guide will help you get started with TradeAI quickly. We'll cover the basic setup and show you how to execute your first trade.

## Basic Setup

1. Install the plugin:
```bash
npm install plugin-tradeai
```

2. Add to your Eliza agent:
```json
{
  "plugins": ["plugin-tradeai"]
}
```

3. Set environment variables:
```bash
ETHEREUM_RPC_URL="your-ethereum-rpc-url"
SOLANA_RPC_URL="your-solana-rpc-url"
TRADING_PRIVATE_KEY="your-trading-wallet-private-key"
```

## Your First Trade

Here's a simple example of executing a trade:

```typescript
// Execute a buy trade on Ethereum
const trade = await agent.executeAction('executeTrade', {
  network: 'ethereum',
  type: 'buy',
  token: 'ETH',
  amount: '0.1',
  price: '2000'
});

console.log('Trade executed:', trade);
```

## Market Data

Get real-time market data:

```typescript
// Get market data for Ethereum
const marketData = await agent.executeAction('getMarketData', {
  token: 'ethereum'
});

console.log('Market data:', marketData);
```

## Portfolio Management

Check your portfolio:

```typescript
// Get Ethereum portfolio
const portfolio = await agent.executeAction('getPortfolio', {
  network: 'ethereum'
});

console.log('Portfolio:', portfolio);
```

## Risk Management

Set up risk management rules:

```typescript
// Set stop loss for a position
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

## Market Monitoring

Monitor market conditions:

```typescript
// Monitor multiple tokens
await agent.executeAction('monitorMarket', {
  tokens: ['ethereum', 'solana', 'bitcoin']
});
```

## Next Steps

Now that you've completed the quick start, you can:

1. Explore the [API Reference](../api-reference/README.md) for detailed information about all available actions
2. Check out the [Examples](../examples/README.md) for more complex use cases
3. Read about [Security Best Practices](../security/best-practices.md) to ensure safe trading
4. Learn about [Advanced Strategies](../examples/advanced-strategies.md) for more sophisticated trading approaches

## Common Patterns

### Setting Up a Trading Strategy

```typescript
// Define a simple moving average strategy
const strategy = {
  id: 'sma-strategy',
  name: 'Simple Moving Average',
  parameters: {
    shortPeriod: 20,
    longPeriod: 50,
    token: 'ETH'
  },
  active: true
};

await agent.executeAction('setTradingStrategy', strategy);
```

### Portfolio Rebalancing

```typescript
// Rebalance portfolio to target allocations
const rebalanceStrategy = {
  id: 'rebalance-strategy',
  name: 'Portfolio Rebalancing',
  parameters: {
    allocations: {
      ETH: 0.4,
      SOL: 0.3,
      BTC: 0.3
    }
  },
  active: true
};

await agent.executeAction('setTradingStrategy', rebalanceStrategy);
```

### Risk Management Setup

```typescript
// Set up comprehensive risk management
const riskConfig = {
  maxPositionSize: 1000,
  stopLoss: 5,
  takeProfit: 10,
  maxDrawdown: 15
};

await agent.executeAction('setTradingStrategy', {
  id: 'risk-management',
  name: 'Risk Management',
  parameters: riskConfig,
  active: true
});
```

## Troubleshooting

If you encounter any issues:

1. Check the agent logs for error messages
2. Verify your environment variables are set correctly
3. Ensure your network connections are working
4. Check the [Troubleshooting Guide](../troubleshooting.md) for common issues

## Support

Need help? Join our community:
- [Discord](https://discord.gg/eliza)
- [GitHub Issues](https://github.com/elizaos/plugin-tradeai/issues)
- [Documentation](https://tradeai.eliza.how) 