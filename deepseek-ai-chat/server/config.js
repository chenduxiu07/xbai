module.exports = {
    DEEPSEEK_API_KEY: process.env.DEEPSEEK_API_KEY,
    DEEPSEEK_API_URL: 'https://api.deepseek.com/v1/chat/completions',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb://localhost:27017/aichat'
};