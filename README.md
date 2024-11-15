## Tebex Purchase Webhook Events -> Discord Bot & Minecraft RCON

If you wish to use this, please credit me and follow the license terms.

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
cd supersmp-donation-tracker
```
### 2. Install dependencies

```bash
npm install
```
& or
```bash
npm i discord.js sqlite3 rcon-client express
```

## Pterodactyl parameters:

If you are using Pterodactyl, esnure the following settings along with the correct git username & token is set.

> Additional Node Packages
```bash
discord.js express rcon-client sqlite3
```

> Startup
```bash
if [[ -d .git ]] && [[ {{AUTO_UPDATE}} == "1" ]]; then git pull; fi; if [[ ! -z ${NODE_PACKAGES} ]]; then /usr/local/bin/npm install ${NODE_PACKAGES}; fi; if [[ ! -z ${UNNODE_PACKAGES} ]]; then /usr/local/bin/npm uninstall ${UNNODE_PACKAGES}; fi; if [ -f /home/container/package.json ]; then /usr/local/bin/npm install; fi; if [[ "${MAIN_FILE}" == "*.js" ]]; then /usr/local/bin/node "/home/container/${MAIN_FILE}" ${NODE_ARGS}; else /usr/local/bin/ts-node --esm "/home/container/${MAIN_FILE}" ${NODE_ARGS}; fi
```

> Main File

```bash
index.js
```

### 3. Run the Bot
```bash
node index.js
```

### 1. Configuration options:

```javascript
module.exports = {
    discord: {
        botToken: 'your-bot-token', // Replace with your Discord bot token
        channelId: 'your-channel-id' // Replace with your target Discord channel ID
    },
    rcon: {
        host: 'your-minecraft-server-ip',
        port: 8194, // Replace with your RCON port
        password: 'your-rcon-password',
        timeout: 750
    },
    webhook: {
        port: 0000 // Port to run the webhook listener
    },
    donationGoal: {
        amountNeeded: 75 // Amount needed to trigger the goal reached event
    },
    embeds: {
        purchase: {
            title: 'Tebex Purchase',
            color: '#ffe93f',
            playerFieldName: 'Player',
            purchasedFieldName: 'Purchased',
            skinBaseUrl: 'https://mc-heads.net/player/'
        },
        rewardSent: {
            title: 'Epic key all!',
            description: '1x Epic Key has been sent to all online players! Thanks everyone for your support!',
            color: '#77DD77'
        },
        goalReached: {
            title: 'Goal Reached!',
            description: 'We have reached our donation goal!',
            color: '#00FF00'
        }
    }
};
```
### Disclaimer:

This is written on the basis that you are using pterodactyl panel, and are able to allocate ports. If you need help with that, you can reach me at discord ``sys_``

### 5. Set Up the Tebex Webhook
Navigate to your Tebex dashboard.
Under Webhooks, create a new webhook with the following:
URL: ``http://your-server-ip:8195/tebex/webhook``
Method: POST
Save the webhook.

### Project Structure
- index.js: Main bot logic and webhook listener
- config.js: Configuration file for customizing bot settings
- donations.db: SQLite database file for tracking donation totals (auto-generated)
- package.json: Contains project dependencies and scripts

## Contribution
Contributions, issues, and feature requests are welcome! Feel free to submit a pull request or open an issue in the repository.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.
