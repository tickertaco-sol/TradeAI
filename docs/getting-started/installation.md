# Installation

This guide will help you install and set up TradeAI in your Eliza agent.

## Prerequisites

Before installing TradeAI, ensure you have:

- Node.js 16.x or higher
- npm or pnpm package manager
- An Eliza agent set up
- Access to blockchain networks (Ethereum and/or Solana)
- API keys for market data providers (optional)

## Installation Steps

### 1. Install the Plugin

Using npm:
```bash
npm install plugin-tradeai
```

Using pnpm:
```bash
pnpm add plugin-tradeai
```

### 2. Add to Eliza Agent

Add the TradeAI plugin to your Eliza agent's character file:

```json
{
  "plugins": [
    "plugin-tradeai"
  ]
}
```

### 3. Configure Environment Variables

Set up the required environment variables:

```bash
# Ethereum Configuration
ETHEREUM_RPC_URL="your-ethereum-rpc-url"
ETHEREUM_PRIVATE_KEY="your-ethereum-private-key"

# Solana Configuration
SOLANA_RPC_URL="your-solana-rpc-url"
SOLANA_PRIVATE_KEY="your-solana-private-key"

# Optional: Market Data API Keys
COINGECKO_API_KEY="your-coingecko-api-key"
BINANCE_API_KEY="your-binance-api-key"
```

### 4. Configure Plugin Settings

Create a configuration file (e.g., `tradeai.config.json`):

```json
{
  "networks": {
    "ethereum": {
      "rpcUrl": "your-ethereum-rpc-url",
      "chainId": 1
    },
    "solana": {
      "rpcUrl": "your-solana-rpc-url"
    }
  },
  "trading": {
    "maxSlippage": 0.5,
    "gasLimit": 300000,
    "timeout": 30000
  },
  "riskManagement": {
    "maxPositionSize": 1000,
    "stopLoss": 5,
    "takeProfit": 10
  }
}
```

### 5. Start Your Agent

Start your Eliza agent with the TradeAI plugin:

```bash
pnpm start --character="path-to-charfile.json"
```

## Verification

To verify the installation:

1. Check the agent logs for successful plugin initialization
2. Try a simple market data query:
```typescript
const marketData = await agent.executeAction('getMarketData', { token: 'ethereum' });
console.log(marketData);
```

## Troubleshooting

### Common Issues

1. **Plugin Not Found**
   - Ensure the plugin is properly installed
   - Check the character file configuration
   - Verify the plugin name in package.json

2. **Network Connection Issues**
   - Verify RPC URLs are correct
   - Check network connectivity
   - Ensure API keys are valid

3. **Permission Issues**
   - Verify private keys are correctly formatted
   - Check file permissions
   - Ensure environment variables are set

### Getting Help

If you encounter any issues:
- Check the [GitHub Issues](https://github.com/elizaos/plugin-tradeai/issues)
- Join our [Discord Community](https://discord.gg/eliza)
- Review the [Troubleshooting Guide](../troubleshooting.md)

## Next Steps

After installation:
- Read the [Quick Start Guide](quick-start.md)
- Explore the [API Reference](../api-reference/README.md)
- Check out the [Examples](../examples/README.md) 