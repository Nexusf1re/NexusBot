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
const handleStartCommand = (chatId) => {
    console.log('Comando /start recebido');
    sendMessage(chatId, 'Bem-vindo ao bot!');
};

const handleAplicativoCommand = (chatId) => {
    console.log('Comando /financeiro recebido');
    sendMessage(chatId, 'Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
};

const handleGoldenCommand = (chatId) => {
    console.log('Comando /golden recebido');
    sendMessage(chatId, 'Clique no link para acessar o Golden Software: https://t.me/n3xuss_bot/goldensoft');
};

// Mapeamento de comandos
const commands = {
    '/start': handleStartCommand,
    '/financeiro': handleAplicativoCommand,
    '/golden': handleGoldenCommand,
};

// Endpoint de webhook
app.post('/webhook', (req, res) => {
    const update = req.body;

    // Verifica se é uma mensagem de texto
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const messageText = update.message.text;

        console.log('Recebido webhook:', update);

        // Verifica se o comando existe e chama a função correspondente
        if (commands[messageText]) {
            commands[messageText](chatId);
        } else {
            console.log(`Comando desconhecido recebido: ${messageText}`);
            sendMessage(chatId, 'Desculpe, não reconheço esse comando.');
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
