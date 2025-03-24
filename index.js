const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const { Rcon } = require('rcon-client');
const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const config = require('./config');
const fs = require('fs');

const app = express();
const client = new Client({ intents: [GatewayIntentBits.Guilds] });


/*const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
*/
const db = new sqlite3.Database('./donations.db', (err) => {
    if (err) {
        console.error('Could not connect to database:', err);
    } else {
        console.log('Connected to the SQLite database');
        db.run("CREATE TABLE IF NOT EXISTS donations (totalAmount REAL)", (error) => {
            if (error) console.error('Error creating table:', error);
            db.run("INSERT INTO donations (totalAmount) SELECT 0 WHERE NOT EXISTS (SELECT 1 FROM donations)", console.error);
        });
    }
});


const rcon = new Rcon({
    host: config.rcon.host,
    port: config.rcon.port,
    password: config.rcon.password,
    timeout: config.rcon.timeout
});


async function getTotalAmount() {
    return new Promise((resolve, reject) => {
        db.get("SELECT totalAmount FROM donations", (err, row) => {
            if (err) reject(err);
            else resolve(row.totalAmount);
        });
    });
}


async function updateTotalAmount(amount) {
    return new Promise((resolve, reject) => {
        db.run("UPDATE donations SET totalAmount = ?", amount, (err) => {
            if (err) reject(err);
            else resolve();
        });
    });
}

app.post('/tebex/webhook', express.json(), async (req, res) => { // we listen to https://domain.com/tebex/webhook
    try {
        const payload = req.body.subject;
        let totalAmount = await getTotalAmount();

        totalAmount += parseFloat(payload.price_paid.amount.toFixed(2));
        if (totalAmount >= config.donationGoal.amountNeeded) {
            totalAmount = 0;
            await createGoalReachedEmbed(client.channels.cache.get(config.discord.channelId));
        }
        await updateTotalAmount(totalAmount);

        const embed = createDiscordEmbed(payload);
        const channel = client.channels.cache.get(config.discord.channelId);
        const message = await channel.send({ embeds: [embed] });
        await message.react('<:Hype:1193555765059919882>');

        res.status(200).json({ message: 'Success' });
    } catch (error) {
        console.error('Error processing webhook:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const createDiscordEmbed = (payload) => {
    const { title, color, playerFieldName, purchasedFieldName, skinBaseUrl } = config.embeds.purchase;
    const skinUrl = `${skinBaseUrl}${payload.customer.username.username}.png`;
    return new EmbedBuilder()
        .setTitle(title)
        .setColor(color)
        .addFields(
            { name: playerFieldName, value: payload.customer.username.username },
            { name: purchasedFieldName, value: payload.products.map((product) => `${product.name} x${product.quantity}`).join('\n') }
        )
        .setImage(skinUrl);
};

const createRewardSentEmbed = async (channel) => {
    const { title, description, color } = config.embeds.rewardSent;
    const rewardEmbed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);
    await channel.send({ embeds: [rewardEmbed] });
};

const createGoalReachedEmbed = async (channel) => {
    const { title, description, color } = config.embeds.goalReached;
    const goalReachedEmbed = new EmbedBuilder()
        .setTitle(title)
        .setDescription(description)
        .setColor(color);
    await channel.send({ embeds: [goalReachedEmbed] });

    try {
        await rcon.connect();
        await rcon.send("crate key giveall epic 1");
        await rcon.send("goalreached");
        console.log('Rcon command sent');
        await createRewardSentEmbed(channel);
    } catch (error) {
        console.error('RCON error:', error);
    } finally {
        rcon.end();
    }
};

app.listen(config.webhook.port, () => console.log(`Express server running on port ${config.webhook.port}`));

client.on('ready', () => {
    console.log(`Ready on ${client.user.tag}`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }
});

client.login(config.discord.botToken);
