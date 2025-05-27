const axios = require('axios');
const config = require('../config');

async function callDeepSeekAPI(message) {
    try {
        const response = await axios.post(config.DEEPSEEK_API_URL, {
            model: "deepseek-chat",
            messages: [{ role: "user", content: message }],
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${config.DEEPSEEK_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        console.error('DeepSeek API Error:', error.response?.data || error.message);
        throw new Error('Failed to get response from AI');
    }
}

module.exports = { callDeepSeekAPI };