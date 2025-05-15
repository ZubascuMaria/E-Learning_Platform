import axios from 'axios';

export const chatWithGemini = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`,
      {
        contents: [{ parts: [{ text: message }] }],
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
        params: {
          key: process.env.GEMINI_API_KEY,
        },
      }
    );

    const reply = response.data.candidates[0].content.parts[0].text;
    res.json({ reply });
  } catch (error) {
    console.error('Gemini error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Gemini API error' });
  }
};
