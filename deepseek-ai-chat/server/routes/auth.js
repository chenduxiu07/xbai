const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
require('dotenv').config();

// 注册
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // 检查用户是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: '该邮箱已被注册' });
        }
        
        // 哈希密码
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // 创建新用户
        const user = new User({
            username,
            email,
            password: hashedPassword
        });
        
        await user.save();
        
        res.status(201).json({ message: '注册成功' });
    } catch (error) {
        res.status(500).json({ message: '注册失败', error: error.message });
    }
});

// 登录
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // 1. 验证用户是否存在
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: '邮箱或密码错误' });
        }
        
        // 2. 验证密码
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: '邮箱或密码错误' });
        }
        
        // 3. 生成JWT令牌
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: '登录失败', error: error.message });
    }
});

// 添加忘记密码路由
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;
        
        // 1. 验证邮箱是否存在
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: '该邮箱未注册' });
        }
        
        // 2. 生成重置令牌(示例，实际应使用更安全的方式)
        const resetToken = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET + user.password,
            { expiresIn: '1h' }
        );
        
        // 3. 发送重置邮件(这里只是示例，实际需要配置邮件服务)
        const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
        console.log('重置链接:', resetLink); // 实际开发中应发送邮件
        
        res.json({ message: '重置链接已发送' });
    } catch (error) {
        res.status(500).json({ message: '重置密码失败', error: error.message });
    }
});

module.exports = router;
