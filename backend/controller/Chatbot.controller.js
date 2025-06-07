import axios from 'axios';

export const chatWithBot = async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: "Message is required" });
    }

    // Load from .env
    const BOT_API_KEY = process.env.BOT_API_KEY;
    const BOT_API_ENDPOINT = process.env.BOT_API_ENDPOINT;

    try {
        const response = await axios.post(
            `${BOT_API_ENDPOINT}?key=${BOT_API_KEY}`,
            {
                contents: [
                    {
                        role: 'user',
                        parts: [{ text: message }]
                    }
                ]
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const botResponse = response.data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";
        res.status(200).json({ response: botResponse });
    } catch (error) {
        console.error("Error in chatWithBot:", error?.response?.data || error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
