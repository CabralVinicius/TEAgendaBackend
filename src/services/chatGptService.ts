import axios from 'axios';

const chatGptApiKey = process.env.CHAT_GPT_API_KEY;
const chatGptApiUrl = 'https://api.openai.com/v1/images/generate'; // Exemplo, ajuste conforme necessário

async function generateImageForKeyword(keyword: string): Promise<string> {
    try {
        const response = await axios.post(
            chatGptApiUrl,
            { prompt: keyword, n: 1 }, // Exemplo de payload, ajuste conforme a documentação da API
            { headers: { 'Authorization': `Bearer ${chatGptApiKey}` } }
        );

        // Assumindo que a API retorna um link para a imagem gerada
        return response.data.url;
    } catch (error) {
        console.error('Error generating image:', error);
        throw error;
    }
}

export { generateImageForKeyword };
