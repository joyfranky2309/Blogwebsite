const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
require('dotenv').config(); 
const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY, 
});

// Route to handle queries using Groq SDK
router.post('/GPT', async (req, res) => {
  const { query } = req.body;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [{ role: 'user', content: query }],
      model: 'deepseek-r1-distill-llama-70b',
      temperature: 0.6,
      max_completion_tokens: 4096,
      top_p: 0.95,
      stream: true,
      stop: null,
    });

    let response = '';
    for await (const chunk of chatCompletion) {
      response += chunk.choices[0]?.delta?.content || '';
    }

    res.status(200).json({ response: response.trim() });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch response from Groq' });
  }
});

module.exports = router;