#!/usr/bin/env node

const http = require('http');

// Function to send a message to the MCP server
function sendMessage(message) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 8765,
      path: '/sse',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      }
    };

    const req = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        try {
          const data = chunk.toString();
          console.log('Received data:', data);
          
          // Parse SSE format
          if (data.startsWith('data: ')) {
            const jsonStr = data.substring(6).trim();
            const response = JSON.parse(jsonStr);
            resolve(response);
          }
        } catch (error) {
          console.error('Error parsing response:', error);
        }
      });
      
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

    req.on('error', (e) => {
      console.error(`Problem with request: ${e.message}`);
      reject(e);
    });

    // Write data to request body
    req.write(JSON.stringify(message));
    req.end();
  });
}

// Test ping message
async function testPing() {
  const pingMessage = {
    type: 'ping',
    id: '1234'
  };
  
  console.log('Sending ping message:', pingMessage);
  
  try {
    const response = await sendMessage(pingMessage);
    console.log('Received response:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test capabilities message
async function testCapabilities() {
  const capabilitiesMessage = {
    type: 'capabilities',
    id: '5678'
  };
  
  console.log('Sending capabilities message:', capabilitiesMessage);
  
  try {
    const response = await sendMessage(capabilitiesMessage);
    console.log('Received response:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Test tool call
async function testToolCall() {
  const toolCallMessage = {
    type: 'tool_call',
    id: '9012',
    name: 'fabric_get_video_info',
    parameters: {
      youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
    }
  };
  
  console.log('Sending tool call message:', toolCallMessage);
  
  try {
    const response = await sendMessage(toolCallMessage);
    console.log('Received response:', response);
  } catch (error) {
    console.error('Error:', error);
  }
}

// Run tests
async function runTests() {
  await testPing();
  await testCapabilities();
  await testToolCall();
}

runTests(); 