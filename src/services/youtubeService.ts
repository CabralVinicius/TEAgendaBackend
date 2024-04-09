import axios from 'axios';

const youtubeApiKey = process.env.YOUTUBE_API_KEY;
const youtubeApiUrl = 'https://www.googleapis.com/youtube/v3/search'; // URL da API do YouTube

async function searchVideosForKeyword(keyword: string): Promise<string[]> {
    try {
        const response = await axios.get(youtubeApiUrl, {
            params: {
                key: youtubeApiKey,
                q: keyword,
                part: 'snippet',
                type: 'video'
            }
        });

        // Extraia e retorne os links dos vídeos
        const videoLinks = response.data.items.map((item: any) => `https://www.youtube.com/watch?v=${item.id.videoId}`);
        return videoLinks;
    } catch (error) {
        console.error('Error searching YouTube videos:', error);
        throw error;
    }
}

export { searchVideosForKeyword };
