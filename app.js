const { Telegraf } = require('telegraf');

const app = express();
const bot = new Telegraf(process.env.BOT_TOKEN);

// Middleware para processar atualizações
app.use(bot.webhookCallback('/webhook'));


// Defina os comandos e respostas
bot.start((ctx) => ctx.reply('Bem-vindo ao bot!'));
bot.command('Aplicativo', (ctx) => {
    ctx.reply('Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
});

// Inicia o servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Bot está rodando...');
});

// Define o webhook
bot.launch();