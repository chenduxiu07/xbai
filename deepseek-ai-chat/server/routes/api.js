const express = require('express');
const router = express.Router();
const { callDeepSeekAPI } = require('../controllers/aiController');
const Chat = require('../models/chatModel');

console.log('Chat route loaded');

router.post('/chat', async (req, res) => {
    if (!req.body || typeof req.body.message !== 'string') {
        return res.status(400).json({ error: 'Invalid request format' });
    }
    try {
        const { message } = req.body;
        const response = await callDeepSeekAPI(message);
        
        // 保存聊天记录
        await Chat.create({
            userMessage: message,
            aiResponse: response
        });

        res.json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/history', async (req, res) => {
    try {
        const chats = await Chat.find().sort({ timestamp: -1 }).limit(20);
        res.json(chats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;