require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware para processar atualizações
app.use(express.json());
app.use(bot.webhookCallback('/webhook'));

// Defina os comandos e respostas
bot.start((ctx) => ctx.reply('Bem-vindo ao bot!'));
bot.command('aplicativo', (ctx) => {
    ctx.reply('Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
});

// Middleware para logar o webhook
app.post('/webhook', (req, res) => {
    console.log('Recebido webhook:', req.body);
    res.sendStatus(200); // Responda ao Telegram com 200 OK
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot está rodando na porta ${PORT}...`);
});
