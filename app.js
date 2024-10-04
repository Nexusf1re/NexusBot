const { Telegraf } = require('telegraf');

// Substitua pelo token do seu bot
const bot = new Telegraf(process.env.BOT_TOKEN || '6815698951:AAHsv-xxwU6JbV6G82E2MmSHcIXaVaQ5h2U');

// Comando /Aplicativo
bot.command('Aplicativo', (ctx) => {
    ctx.reply('Você acionou o comando /Aplicativo! Aqui estão as informações sobre o aplicativo:');
    ctx.reply('Clique no link abaixo para acessar o Sistema Financeiro:\nhttps://t.me/n3xuss_bot/SistemaFinanceiro');
});

// Outros comandos
bot.start((ctx) => {
    ctx.reply('Bem-vindo ao bot! Use /Aplicativo para saber mais sobre o aplicativo.');
});

bot.command('help', (ctx) => {
    ctx.reply('Aqui estão os comandos disponíveis:\n/start - Inicia o bot\n/help - Mostra esta mensagem de ajuda\n/Aplicativo - Informações sobre o aplicativo');
});

// Inicia o bot
bot.launch();
console.log('Bot está rodando...');
