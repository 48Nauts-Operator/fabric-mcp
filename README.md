# Fabric MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A powerful Multimodal Conversational Protocol (MCP) integration for [Fabric](https://github.com/danielmiessler/fabric) that enables Claude to process YouTube videos and various content types through a unified API.

## 🌟 Features

### YouTube Processing
- **Video Info Extraction**: Get metadata about YouTube videos
- **Transcription**: Generate accurate transcriptions of video content
- **Summarization**: Create concise summaries of lengthy videos
- **Wisdom Extraction**: Identify key insights and wisdom from content
- **Claim Analysis**: Evaluate claims made in videos for accuracy
- **Interesting Parts**: Extract the most engaging segments of videos

### Content Processing
- **Content Rating**: Evaluate quality based on content type
- **Essay Writing**: Generate well-structured essays on any topic
- **Academic Paper Summarization**: Create concise summaries of research papers
- **AI Art Prompt Creation**: Generate prompts for AI art generation
- **Code Explanation**: Provide detailed breakdowns of code snippets
- **Documentation Enhancement**: Improve technical documentation clarity
- **Social Media Content**: Create platform-specific social media posts

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- **Fabric installed and configured** (see [Fabric installation guide](https://github.com/danielmiessler/fabric))
  - You'll need to configure Fabric with your LLM API keys (OpenAI, Anthropic, etc.)
  - For YouTube operations, you'll need a YouTube API key configured in Fabric

### Installation

1. Clone the repository:

```bash
git clone https://github.com/48Nauts-Operator/fabric-mcp.git
cd fabric-mcp
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following variables:

```bash
PORT=3000
FABRIC_API_URL=http://localhost:5000 # Or wherever your Fabric instance is running
```

4. Build the project:

```bash
npm run build
```

5. Start the server:

```bash
npm start
```

## 📖 Usage

The MCP server exposes an API endpoint at `/api/mcp` that accepts POST requests.

### YouTube Processing Example

```json
{
  "operation": "TRANSCRIBE_YOUTUBE",
  "params": {
    "youtubeUrl": "https://www.youtube.com/watch?v=VIDEO_ID",
    "includeMetadata": true,
    "includeSummary": true,
    "includeKeyPoints": true
  }
}
```

### Content Processing Example

```json
{
  "operation": "WRITE_ESSAY",
  "params": {
    "essayTopic": "The impact of artificial intelligence on modern society",
    "userVoice": "academic"
  }
}
```

## 🔧 Development

To start the development server with hot reloading:

```bash
npm run dev
```

If you encounter a port conflict (EADDRINUSE error), you can change the port in your `.env` file.

## 📋 API Operations

### YouTube Operations
- `GET_VIDEO_INFO`: Retrieves metadata about a YouTube video
- `TRANSCRIBE_YOUTUBE`: Generates a transcription of a YouTube video
- `SUMMARIZE_YOUTUBE`: Creates a concise summary of a YouTube video
- `EXTRACT_WISDOM`: Extracts key insights and wisdom from a YouTube video
- `ANALYZE_CLAIMS`: Analyzes and evaluates claims made in a YouTube video
- `EXTRACT_INTERESTING_PARTS`: Identifies and extracts the most interesting segments of a video

### Content Operations
- `RATE_CONTENT`: Evaluates the quality of content based on its type
- `WRITE_ESSAY`: Generates an essay on a specified topic
- `SUMMARIZE_PAPER`: Creates a concise summary of an academic paper
- `CREATE_ART_PROMPT`: Generates AI art prompts from text content
- `EXPLAIN_CODE`: Provides detailed explanations of code snippets
- `IMPROVE_DOCUMENTATION`: Enhances existing documentation with clearer explanations
- `CREATE_SOCIAL_MEDIA`: Generates social media posts from content

## 🏗️ Project Structure

- `src/`: Source code
  - `config/`: Configuration files
  - `controllers/`: API controllers
  - `services/`: Service layer
  - `types/`: TypeScript type definitions
  - `utils/`: Utility functions
- `dist/`: Compiled JavaScript (generated)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Fabric](https://github.com/danielmiessler/fabric) - The AI pattern framework
- [Anthropic](https://www.anthropic.com/) - For the MCP framework and Claude
- [21Nauts.com](https://21nauts.com) - For the good coffee 