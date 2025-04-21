const express = require('express');
const { OpenAI } = require('openai');
const path = require('path');
const app = express();
const PORT = 3000;

// 使用你的 DeepSeek API key
const openai = new OpenAI({
  apiKey: 'YOUR_DEEPSEEK_API_KEY',
  baseURL: 'https://api.deepseek.com/v1',
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await openai.chat.completions.create({
      model: 'deepseek-chat',
      messages: [{ role: 'user', content: userMessage }],
    });

    const botReply = response.choices[0].message.content;
    res.json({ reply: botReply });

  } catch (error) {
    console.error('DeepSeek error:', error);
    res.status(500).json({ reply: '⚠️ 出错了，请稍后再试。' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 DeepSeek Chatbot running at http://localhost:${PORT}`);
});