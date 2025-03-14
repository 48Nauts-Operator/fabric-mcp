# Fabric MCP

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server for integrating Fabric with Claude and other AI assistants.

## Overview

This MCP server allows Claude to interact with Fabric, enabling operations like:

- Getting YouTube video information
- Transcribing YouTube videos
- Extracting wisdom from videos
- Analyzing claims in content
- Extracting interesting parts from videos
- Rating content quality
- Writing essays
- Summarizing academic papers
- Creating AI art prompts
- Explaining code
- Improving documentation
- Creating social media posts

## Setup

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the MCP server:
   ```
   ./simple-mcp-server.js
   ```
4. Start the Fabric server:
   ```
   npm start
   ```

## Using with Cursor

1. Open Cursor
2. Configure the MCP in Cursor settings:
   - MCP URL: `http://localhost:8765/sse`
   - Configuration file: `/Users/jarvis/0200_projects/dev/MCP-Projects/fabric-mcp/fabric-mcp-config.json`
3. Use the `/mcp` command in Cursor to interact with Fabric

## Example Commands

### Get Video Info
```
/mcp get_video_info youtubeUrl=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Transcribe YouTube Video
```
/mcp transcribe_youtube youtubeUrl=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

### Extract Wisdom
```
/mcp extract_wisdom youtubeUrl=https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

## Troubleshooting

- If you encounter a "Client closed" error, make sure both the MCP server and Fabric server are running.
- Check the logs in `mcp-server.log` for any errors.
- Ensure the operation names in your requests match exactly with the supported operations.

## License

MIT

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