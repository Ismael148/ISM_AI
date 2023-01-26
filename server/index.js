import { Configuration, OpenAIApi } from 'openai';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const configuration = new Configuration({
  organization: 'org-Bll5XrQFP1kTk531kAJObVWs',
  apiKey: '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',
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
