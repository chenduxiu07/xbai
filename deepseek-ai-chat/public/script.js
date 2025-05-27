document.addEventListener('DOMContentLoaded', () => {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');


    // 在DOMContentLoaded回调中添加：
    async function loadChatHistory() {
        try {
            const response = await fetch(`${window.API_CONFIG.BASE_URL}${window.API_CONFIG.HISTORY_API}`);
            const history = await response.json();
            
            history.reverse().forEach(chat => {
                addMessage('user', chat.userMessage);
                addMessage('ai', chat.aiResponse);
            });
        } catch (error) {
            console.error('加载历史记录失败:', error);
        }
    }

    // 页面加载时调用
    loadChatHistory();


    sendBtn.addEventListener('click', sendMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });

    function sendMessage() {
        const message = userInput.value.trim();
        if (!message) return;

        addMessage('user', message);
        userInput.value = '';
        userInput.disabled = true;

        // 打印请求数据到控制台
        const requestData = { message };
        console.log('发送请求数据:', JSON.stringify(requestData, null, 2));

        // 修改sendMessage函数中的fetch请求
        fetch(`${window.API_CONFIG.BASE_URL}${window.API_CONFIG.CHAT_API}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('authToken')}`
            },
            body: JSON.stringify(requestData)
        })
        .then(response => {
            console.log('收到响应状态:', response.status);
            return response.json();
        })
        .then(data => {
            console.log('收到响应数据:', data);
            addMessage('ai', data.reply);
        })
        .catch(error => {
            console.error('请求错误:', error);
            addMessage('error', '发生错误，请重试');
        })
        .finally(() => {
            userInput.disabled = false;
            userInput.focus();
        });
    }

    function addMessage(sender, text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});

