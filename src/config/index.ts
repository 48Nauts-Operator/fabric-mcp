import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const config = {
  server: {
    port: process.env.PORT || 3000,
    nodeEnv: process.env.NODE_ENV || 'development',
  },
  fabric: {
    apiUrl: process.env.FABRIC_API_URL || 'https://api.fabric.com/v1',
    apiKey: process.env.FABRIC_API_KEY || '',
  },
  youtube: {
    apiKey: process.env.YOUTUBE_API_KEY || '',
  }
};

export default config; 