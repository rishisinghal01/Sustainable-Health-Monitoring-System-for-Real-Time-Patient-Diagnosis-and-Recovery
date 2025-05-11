const express = require('express')
const cors = require('cors');
const app = express()
const port = 3000
const router2 =require("./routes/sending");

// Enable CORS for all routes
const corsOptions = {
  origin: 'http://localhost:5173',
  method: 'GET,POST,PUT,DELETE,',
  allowheaders: "content-type,",
  credentials: true,
};
app.use(cors(corsOptions));

const router1 = require("./routes/user");
const { connectMongo } = require('./connection');

app.get('/', (req, res) => {
  res.send('Hello World!zdnbv,sm')
})

// --------------------------------------------------------
// handle routes
app.use(express.json());
app.use('/user', router1);

// connect mongodb
connectMongo(process.env.MONGODB_URI)
  .then(() => console.log('mongodb connected'))
  .catch((err) => console.log(err));
// chatbot-----------------------------------------------
// server.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post('/chat', async (req, res) => {
    const userMessage = req.body.message || "Hello";

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

        const prompt = `
        You are a helpful medical assistant. Answer only medical-related queries.

        For each query:
        - First respond in **English**
        - Then provide the **same response in Hindi**

        Include:
        - Recommended exercises
        - Helpful foods
        - Possible medications or treatments

        User Query: ${userMessage}
        `;

        const result = await model.generateContent(prompt);
        const response = result.response.text();

        res.json({ reply: response });

    } catch (error) {
        console.error("Error with Gemini API:", error);
        res.status(500).send(`Error generating response: ${error.message}`);
    }
});
// sending mail
app.use('/sending',router2);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
