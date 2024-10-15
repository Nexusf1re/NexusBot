require('dotenv').config();
const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

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

app.post('/webhook', (req, res) => {
    const update = req.body;

    if (update.message && update.message.text) {
        const chatId = update.message.chat.id;
        const messageText = update.message.text;

        if (messageText === '/start') {
            sendMessage(chatId, 'Bem-vindo ao bot!');
        } else if (messageText === '/aplicativo') {
            sendMessage(chatId, 'Clique no link para acessar o Sistema Financeiro: https://t.me/n3xuss_bot/SistemaFinanceiro');
        }
    }

    console.log('Recebido webhook:', update);
    res.sendStatus(200);
});

module.exports = app;
