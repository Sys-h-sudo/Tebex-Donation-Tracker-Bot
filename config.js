module.exports = {
    discord: {
        botToken: '',
        channelId: '' 
    },

    rcon: {
        host: '172.18.0.1',
        port: 8190,
        password: 'rcon_password',
        timeout: 750
    },
    webhook: {
        port: 8191
    },
    donationGoal: {
        amountNeeded: 75 // amount needed
    },
    embeds: {
        purchase: {
            title: '🎉 Store Donation',
            color: '#FBCD08',
            playerFieldName: 'Player',
            purchasedFieldName: 'Purchased',
            skinBaseUrl: 'https://vzge.me/bust/' // Supports 3d Models.
        },
        rewardSent: {
            title: '🎉 Epic Key All!',
            description: '**1x Epic Key** has been given to **all** online players!',
            color: '#FBCD08'
        },
        goalReached: {
            title: '🎉 Goal Reached!',
            description: 'We have reached our donation goal!',
            color: '#FBCD08'
        },
        ReachedGoal: {
            title: '🎉 Goal Reached & Rewards Sent!',
            description: 'We have reached our donation goal and **1x Epic Key** has been given to **all** online players!',
            color: '#FBCD08' 
        }
    }
};
