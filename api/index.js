require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const axios = require('axios'); // Para fazer requisições HTTP

const app = express();

// Middleware para processar atualizações
app.use(express.json());

// Função para enviar mensagens para o Telegram
const sendMessage = async (chatId, text) => {
    try {
        const response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: text,
        });
        console.log('Mensagem enviada com sucesso:', response.data);
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error.response ? error.response.data : error.message);
    }
};

// Funções para comandos
const handleStartCommand = async (chatId) => {
    console.log('Comando /start recebido');
    await sendMessage(chatId, 'Bem-vindo ao bot!');
    console.log('Mensagem de boas-vindas enviada para /start');
};

const handleAplicativoCommand = async (chatId) => {
    console.log('Comando /financeiro recebido');
    await sendMessage(chatId, 'Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
    console.log('Mensagem de acesso ao sistema financeiro enviada');
};

const handleGoldenCommand = async (chatId) => {
    console.log('Comando /golden recebido');
    await sendMessage(chatId, 'Clique no link para acessar o Golden Software: https://t.me/n3xuss_bot/goldensoft');
    console.log('Mensagem de acesso ao Golden Software enviada');
};

// Mapeamento de comandos
const commands = {
    '/start': handleStartCommand,
    '/financeiro': handleAplicativoCommand,
    '/golden': handleGoldenCommand,
};

// Endpoint de webhook
app.post('/webhook', async (req, res) => {
    const update = req.body;

    // Verifica se é uma mensagem de texto
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const messageText = update.message.text.toLowerCase(); // Tratando para minúsculas

        console.log('Recebido webhook:', update);

        // Verifica se o comando existe e chama a função correspondente
        if (commands[messageText]) {
            await commands[messageText](chatId);
        } else {
            console.log(`Comando desconhecido recebido: ${messageText}`);
            await sendMessage(chatId, 'Desculpe, não reconheço esse comando.');
        }
    }

    res.sendStatus(200); // Responda ao Telegram com 200 OK
});

// Inicia o servidor (se necessário)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot está rodando na porta ${PORT}...`);
});

// Exporta o app para o Vercel
module.exports = app;
