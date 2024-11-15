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
