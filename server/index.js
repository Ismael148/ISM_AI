import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv'; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();

// Open ai Configuration
const configuration = new Configuration({
  organization: process.env.OPENAI_ORGANIZATION,
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 3080;

app.post('/', async (req, res) => {
  const { message, currentModel } = req.body;
  // console.log(message, 'message');
  const response = await openai.createCompletion({
    model: `${currentModel}`,
    prompt: `${message}`,
    max_tokens: 2048,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.get('/models', async (req, res) => {
  const response = await openai.listModels();
  console.log(response.data.data);
  res.json({
    models: response.data.data,
  });
});

app.listen(port, () => {
  console.log(`Application is running at http://localhost:${port}`);
});
