const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware para processar atualizações
app.use(bot.webhookCallback('/webhook'));

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

// (Não use bot.launch() quando estiver usando webhook)
