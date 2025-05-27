/**
 * 前端API配置
 * 根据当前域名自动判断环境
 */
const API_CONFIG = {
    // 生产环境使用当前域名
    BASE_URL: window.location.origin,
    // API端点
    CHAT_API: '/api/chat',
    HISTORY_API: '/api/history',
    // 超时设置(毫秒)
    TIMEOUT: 10000
};

// 开发环境特殊配置
const { hostname, protocol } = window.location;
if (hostname === 'localhost' || hostname === '127.0.0.1') {
    API_CONFIG.BASE_URL = `${protocol}//${hostname}:3000`;
}

// 全局暴露配置
window.API_CONFIG = Object.freeze(API_CONFIG);