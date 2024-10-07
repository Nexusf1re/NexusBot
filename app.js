require('dotenv').config(); // Carrega as variáveis de ambiente do .env
const express = require('express');
const axios = require('axios'); // Para fazer requisições HTTP

const app = express();

// Middleware para processar atualizações
app.use(express.json());

// Função para enviar mensagens para o Telegram
const sendMessage = async (chatId, text) => {
    try {
        await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
            chat_id: chatId,
            text: text,
        });
    } catch (error) {
        console.error('Erro ao enviar mensagem:', error);
    }
};

// Endpoint de webhook
app.post('/webhook', (req, res) => {
    const update = req.body;

    // Verifica se é uma mensagem de texto
    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const messageText = update.message.text;

        // Resposta ao comando /start
        if (messageText === '/start') {
            sendMessage(chatId, 'Bem-vindo ao bot!');
        }
        // Resposta ao comando /aplicativo
        else if (messageText === '/aplicativo') {
            sendMessage(chatId, 'Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
        }
    }

    console.log('Recebido webhook:', update);
    res.sendStatus(200); // Responda ao Telegram com 200 OK
});

// Inicia o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Bot está rodando na porta ${PORT}...`);
});
