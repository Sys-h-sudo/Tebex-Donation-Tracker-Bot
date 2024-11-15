## Tebex Purchase Webhook Events -> Discord Bot & Minecraft RCON

---

## Features

- **Donation Tracking**: Automatically updates total donations received from Tebex webhooks.
- **Custom Discord Notifications**: Sends stylish embeds to a Discord channel with details of purchases and milestones.
- **In-Game Rewards via RCON**: Triggers commands on the Minecraft server to distribute rewards for reaching donation goals.
- **Configurable Settings**: Customize messages, donation goals, RCON settings, and Discord channel details via `config.js`.

---

## Prerequisites

To set up and run the bot, ensure you have the following:

1. **Node.js** (v16.11 or higher)
2. **Discord Bot Token**
3. **Tebex Webhook URL** (setup in your Tebex dashboard)
4. **RCON Access** to your Minecraft server
5. **SQLite3** (used for lightweight donation tracking)

---

## Setup Tutorial

Follow these steps to get your bot up and running:

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/supersmp-donation-tracker.git
cd supersmp-donation-tracker```

```bash
npm install```
