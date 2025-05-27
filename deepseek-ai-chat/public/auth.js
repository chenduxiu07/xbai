document.addEventListener('DOMContentLoaded', () => {
    // 密码显示/隐藏切换
    document.querySelectorAll('.toggle-password').forEach(button => {
        button.addEventListener('click', (e) => {
            const input = e.currentTarget.parentElement.querySelector('input');
            const icon = e.currentTarget.querySelector('i');
            const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
            input.setAttribute('type', type);
            icon.classList.toggle('fa-eye');
            icon.classList.toggle('fa-eye-slash');
        });
    });

    // 登录表单处理
    // 修改登录请求部分
    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
    
            try {
                const response = await fetch('/api/auth/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    // 登录成功后存储token
                    localStorage.setItem('authToken', data.token);
                    window.location.href = 'index.html';
                } else {
                    alert(data.message || '登录失败');
                }
            } catch (error) {
                console.error('登录错误:', error);
                alert('网络错误，请重试');
            }
        });
    }

    // 注册表单处理
    // 修改注册表单处理逻辑
    const registerForm = document.getElementById('register-form');
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // 修复：使用正确的DOM引用方式
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
    
            if (password !== confirmPassword) {
                alert('两次输入的密码不一致');
                return;
            }
            
            try {
                const response = await fetch('/api/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username,
                        email,
                        password
                    })
                });
                
                const data = await response.json();
                
                if (response.ok) {
                    alert('注册成功，请登录');
                    window.location.href = 'login.html';
                } else {
                    alert(data.message || '注册失败');
                }
            } catch (error) {
                console.error('注册错误:', error);
                alert('网络错误，请重试');
            }
        });
    }
});

// 在文件末尾添加忘记密码表单处理
const forgotPasswordForm = document.getElementById('forgot-password-form');
if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        
        try {
            const response = await fetch('/api/auth/forgot-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                alert('重置链接已发送至您的邮箱，请查收');
                window.location.href = 'login.html';
            } else {
                alert(data.message || '发送重置链接失败');
            }
        } catch (error) {
            console.error('重置密码错误:', error);
            alert('网络错误，请重试');
        }
    });
}