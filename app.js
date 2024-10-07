const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware para processar atualizações do Telegram
app.use('/webhook', (req, res) => {
    console.log('Recebido webhook:', req.body);
    bot.webhookCallback('/webhook')(req, res);
    res.sendStatus(200); // Responde ao Telegram que a requisição foi recebida
});

// Defina os comandos e respostas
bot.start((ctx) => ctx.reply('Bem-vindo ao bot!'));
bot.command('aplicativo', (ctx) => {
    ctx.reply('Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot está rodando na porta ${PORT}...`);
});
