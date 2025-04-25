# TradeAI Plugin for Eliza

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

TradeAI is a powerful plugin for the Eliza AI framework that enables AI agents to perform on-chain trading operations. Built on top of Eliza's agent framework, TradeAI provides a secure and efficient way for AI agents to interact with various blockchain networks and execute trading strategies.

## 🌟 Features

- **Multi-Chain Support**: Trade on multiple blockchain networks including Ethereum, Solana, and more
- **Automated Trading Strategies**: Implement and execute complex trading strategies
- **Real-time Market Data**: Access real-time market data and analytics
- **Secure Transaction Management**: Built-in security features for transaction signing and verification
- **Portfolio Management**: Track and manage trading portfolios
- **Customizable Trading Parameters**: Configure trading parameters and risk management rules
- **Event-Driven Architecture**: React to market events and execute trades automatically
- **Comprehensive API**: Easy-to-use API for integrating with other Eliza plugins

## 📦 Installation

```bash
npm install plugin-tradeai
```

## 🚀 Quick Start

1. Install the plugin in your Eliza agent:
```bash
npx elizaos plugins add plugin-tradeai
```

2. Add the TradeAI plugin to your Eliza agent's character file:
```json
{
  "plugins": [
    "plugin-tradeai"
  ]
}
```

3. Configure your environment variables:
```bash
ETHEREUM_RPC_URL="your-ethereum-rpc-url"
SOLANA_RPC_URL="your-solana-rpc-url"
TRADING_PRIVATE_KEY="your-trading-wallet-private-key"
```

4. Start your agent:
```bash
pnpm start --character="path-to-charfile.json"
```

## 🔧 Configuration

The plugin can be configured through the following parameters:

```typescript
{
  "networks": {
    "ethereum": {
      "rpcUrl": "string",
      "chainId": "number"
    },
    "solana": {
      "rpcUrl": "string"
    }
  },
  "trading": {
    "maxSlippage": "number",
    "gasLimit": "number",
    "timeout": "number"
  },
  "riskManagement": {
    "maxPositionSize": "number",
    "stopLoss": "number",
    "takeProfit": "number"
  }
}
```

## 📚 API Reference

### Trading Actions

- `executeTrade`: Execute a trade on the specified network
- `getMarketData`: Fetch real-time market data
- `getPortfolio`: Get current portfolio status
- `setTradingStrategy`: Configure trading strategy parameters
- `monitorMarket`: Set up market monitoring and alerts

### Services

- `MarketDataService`: Real-time market data and analytics
- `TradingService`: Core trading functionality
- `PortfolioService`: Portfolio management and tracking
- `RiskManagementService`: Risk assessment and management

## 🔐 Security

TradeAI implements several security measures:

- Secure private key management
- Transaction signing verification
- Rate limiting and anti-manipulation measures
- Automated risk management
- Audit logging and monitoring

## 💎 Tokenomics

### Token Launch

TradeAI will be launching on [pump.fun](https://pump.fun), a decentralized platform for launching and trading tokens. The launch will be conducted in a fair and transparent manner, ensuring equal opportunities for all participants.

### Token Distribution

Total Supply: 1,000,000,000 TRADE

#### Initial Distribution

- **Team & Development**: 5% (50,000,000 $TRADEAI)
  - Locked for 6 months
  - Vesting period: 6 months
  - Used for ongoing development and maintenance

- **Partnerships & Listings**: 15% (150,000,000 $TRADEAI)
  - Locked for 6 months
  - Used for exchange listings and strategic partnerships

### Token Utility

The TRADE token serves multiple purposes within the TradeAI ecosystem:

1. **Governance**
   - Voting rights for protocol upgrades
   - Proposal submission and voting
   - Parameter adjustments

2. **Fee Discounts**
   - Reduced trading fees for token holders
   - Tiered benefits based on holding amount
   - Special access to premium features

3. **Staking Rewards**
   - Earn passive income by staking TRADE
   - Participate in protocol security
   - Additional benefits for long-term stakers

4. **Access Control**
   - Premium feature access
   - Early access to new features
   - Exclusive trading strategies

### Vesting Schedule

- **Team Tokens**: 12-month cliff, 24-month linear vesting
- **Partnership Tokens**: 6-month cliff, 12-month linear vesting
- **Community Tokens**: Released gradually based on milestones

### Lock-up Periods

- Team tokens: 12 months
- Partnership tokens: 6 months
- Community tokens: No lock-up

### Transparency

All token allocations and movements will be:
- Publicly verifiable on-chain
- Regularly audited
- Transparently reported to the community

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Links

- [Documentation](https://tradeai.eliza.how)
- [GitHub Repository](https://github.com/elizaos/plugin-tradeai)
- [Discord Community](https://discord.gg/eliza)
- [Twitter](https://twitter.com/eliza_ai)

## 🙏 Acknowledgments

- Eliza AI Framework
- All our contributors and supporters
- The blockchain community

## 📊 Example Execution

Here's an example of how TradeAI will work in practice:

### Example 1: Basic Trade Execution

```typescript
// User request to the Eliza agent
const userRequest = "I want to buy 100,000 BONK tokens at market price";

// Eliza agent processes the request and calls the TradeAI plugin
const response = await agent.executeAction('executeTrade', {
  network: 'solana',
  type: 'buy',
  token: 'BONK',
  amount: '100000',
  price: 'market' // Market price will be fetched automatically
});

// Example response
console.log(response);
/*
{
  id: "trade_123456789",
  network: "solana",
  type: "buy",
  token: "BONK",
  amount: "100000",
  price: "0.00001234",
  timestamp: 1647123456789,
  status: "completed",
  signature: "5KtP3UKw2LXqABXHk7WvGKZwWP9FYhKxr9HF1qUXxY9ZYdVrwwHvtNXbtnKzZQVHKXPHw7SZPkRTgwCBmXF9WnBc"
}
*/
```

### Example 2: Setting Up a Trading Strategy

```typescript
// User request to the Eliza agent
const userRequest = "Set up a stop-loss strategy for my BONK position at 0.000010";

// Eliza agent processes the request and calls the TradeAI plugin
const response = await agent.executeAction('setTradingStrategy', {
  id: 'bonk_stop_loss_1',
  name: 'BONK Stop Loss',
  parameters: {
    token: 'BONK',
    stopLoss: 0.000010,
    takeProfit: 0.000015
  },
  active: true
});

// Example response
console.log(response);
/*
{
  id: "strategy_123456789",
  name: "BONK Stop Loss",
  status: "active",
  parameters: {
    token: "BONK",
    stopLoss: 0.000010,
    takeProfit: 0.000015
  },
  createdAt: 1647123456789
}
*/
```

### Example 3: Portfolio Management

```typescript
// User request to the Eliza agent
const userRequest = "Show me my current portfolio";

// Eliza agent processes the request and calls the TradeAI plugin
const response = await agent.executeAction('getPortfolio', {
  network: 'solana'
});

// Example response
console.log(response);
/*
{
  network: "solana",
  tokens: {
    SOL: {
      balance: "10.5",
      value: "1050.75"
    },
    BONK: {
      balance: "10000000",
      value: "123.45"
    },
    USDC: {
      balance: "5000",
      value: "5000"
    }
  },
  totalValue: "6174.20"
}
*/
```

### Example 4: Market Monitoring

```typescript
// User request to the Eliza agent
const userRequest = "Monitor BONK and WEN prices for me";

// Eliza agent processes the request and calls the TradeAI plugin
const response = await agent.executeAction('monitorMarket', {
  tokens: ['BONK', 'WEN']
});

// Example response
console.log(response);
/*
{
  status: "monitoring",
  tokens: ["BONK", "WEN"],
  startedAt: 1647123456789
}
*/

// The agent will then receive real-time updates via WebSocket
agent.on('priceUpdate', (data) => {
  console.log('Price update:', data);
  /*
  {
    token: "BONK",
    price: "0.00001234",
    change24h: "5.2",
    timestamp: 1647123456789
  }
  */
});
```

### Example 5: Risk Management

```typescript
// User request to the Eliza agent
const userRequest = "Set up risk management for my Solana meme token portfolio";

// Eliza agent processes the request and calls the TradeAI plugin
const response = await agent.executeAction('setTradingStrategy', {
  id: 'risk_management_1',
  name: 'Meme Token Risk Management',
  parameters: {
    maxPositionSize: 1000,
    stopLoss: 10,
    takeProfit: 20,
    maxDrawdown: 25,
    tokens: ['BONK', 'WEN', 'BOME']
  },
  active: true
});

// Example response
console.log(response);
/*
{
  id: "strategy_123456789",
  name: "Meme Token Risk Management",
  status: "active",
  parameters: {
    maxPositionSize: 1000,
    stopLoss: 10,
    takeProfit: 20,
    maxDrawdown: 25,
    tokens: ["BONK", "WEN", "BOME"]
  },
  createdAt: 1647123456789
}
*/
```

These examples demonstrate how TradeAI will enable natural language interaction with the Eliza agent to perform complex trading operations on Solana. The plugin handles all the technical details behind the scenes, making it easy for users to manage their trading activities through simple conversations.

---
