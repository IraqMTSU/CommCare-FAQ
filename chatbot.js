const axios = require('axios');
const readline = require('readline');

const API_KEY = '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';
const API_URL = 'https://api.openai.com/v1/engines/text-davinci-002/completions';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

async function chatGPT(query) {
  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  };

  const data = {
    prompt: `This is an FAQ chatbot for CommCare-related questions.\nUser: ${query}\n`,
    max_tokens: 100,
    n: 1,
    stop: null,
    temperature: 0.8,
  };

  try {
    const response = await axios.post(API_URL, data, { headers });
    return response.data.choices[0].text;
  } catch (error) {
    console.error('Error:', error.response.data);
    return null;
  }
}

function askQuestion() {
  rl.question('Ask a CommCare-related question: ', async (question) => {
    if (question.toLowerCase() === 'exit') {
      rl.close();
    } else {
      const answer = await chatGPT(question);
      if (answer) {
        console.log('Answer:', answer);
      }
      askQuestion();
    }
  });
}

console.log('Type "exit" to quit the chatbot de in shalah.');
askQuestion();
