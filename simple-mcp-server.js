#!/usr/bin/env node

const http = require('http');
const fs = require('fs');
const path = require('path');

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }

  // Handle health check endpoint
  if (req.url === '/health' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', message: 'MCP server is running' }));
    return;
  }

  // Handle SSE endpoint
  if (req.url === '/sse') {
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive'
    });

    // Send a comment to keep the connection alive
    const keepAlive = setInterval(() => {
      res.write(': keep-alive\n\n');
    }, 30000);

    // Handle client disconnect
    req.on('close', () => {
      clearInterval(keepAlive);
    });

    // Handle incoming messages
    req.on('data', (chunk) => {
      try {
        const message = JSON.parse(chunk.toString());
        handleMessage(message, res);
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    return;
  }

  // Handle other endpoints
  res.writeHead(404);
  res.end('Not Found');
});

// Define the MCP server capabilities
const serverCapabilities = {
  schema_version: "v1",
  server_info: {
    name: "fabric-mcp",
    version: "1.0.0",
    description: "Process YouTube videos and various content types using Fabric patterns"
  },
  tools: [
    {
      name: "get_video_info",
      description: "Get information about a YouTube video",
      input_schema: {
        type: "object",
        properties: {
          youtubeUrl: {
            type: "string",
            description: "The URL of the YouTube video"
          }
        },
        required: ["youtubeUrl"]
      }
    },
    {
      name: "transcribe_youtube",
      description: "Transcribe a YouTube video",
      input_schema: {
        type: "object",
        properties: {
          youtubeUrl: {
            type: "string",
            description: "The URL of the YouTube video"
          }
        },
        required: ["youtubeUrl"]
      }
    },
    {
      name: "extract_wisdom",
      description: "Extract wisdom from a YouTube video",
      input_schema: {
        type: "object",
        properties: {
          youtubeUrl: {
            type: "string",
            description: "The URL of the YouTube video"
          }
        },
        required: ["youtubeUrl"]
      }
    }
  ]
};

// Helper function to make HTTP requests
function makeHttpRequest(options, postData) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          resolve(data);
        }
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (postData) {
      req.write(JSON.stringify(postData));
    }
    req.end();
  });
}

// Handle MCP protocol messages
function handleMessage(message, res) {
  console.log('Received message:', message);

  if (message.type === 'ping') {
    // Respond to ping
    sendSSEMessage(res, {
      type: 'pong',
      id: message.id
    });
  } 
  else if (message.type === 'capabilities') {
    // Respond with server capabilities
    sendSSEMessage(res, {
      type: 'capabilities_response',
      id: message.id,
      capabilities: serverCapabilities
    });
  } 
  else if (message.type === 'tool_call') {
    // Handle tool calls
    handleToolCall(message, res);
  } 
  else {
    // Unknown message type
    sendSSEMessage(res, {
      type: 'error',
      id: message.id || null,
      error: {
        message: `Unknown message type: ${message.type}`,
        type: 'protocol_error'
      }
    });
  }
}

// Handle tool calls
async function handleToolCall(message, res) {
  const toolName = message.name;
  const params = message.parameters;
  
  try {
    let result;
    
    // Forward the request to our HTTP server
    if (toolName === 'get_video_info' || 
        toolName === 'transcribe_youtube' || 
        toolName === 'extract_wisdom') {
      
      const postData = {
        operation: toolName,
        params: {
          youtubeUrl: params.youtubeUrl
        }
      };
      
      const options = {
        hostname: 'localhost',
        port: 3011,
        path: '/api/mcp',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(JSON.stringify(postData))
        }
      };
      
      result = await makeHttpRequest(options, postData);
    } 
    else {
      throw new Error(`Unknown tool: ${toolName}`);
    }
    
    // Send successful response
    sendSSEMessage(res, {
      type: 'tool_response',
      id: message.id,
      status: 'success',
      result: result
    });
  } catch (error) {
    // Send error response
    sendSSEMessage(res, {
      type: 'tool_response',
      id: message.id,
      status: 'error',
      error: {
        message: error.message || 'Unknown error',
        type: 'internal_error'
      }
    });
  }
}

// Helper function to send SSE messages
function sendSSEMessage(res, message) {
  res.write(`data: ${JSON.stringify(message)}\n\n`);
}

// Start the server
const PORT = 8765;
server.listen(PORT, () => {
  console.log(`Fabric MCP server started on port ${PORT}`);
}); 