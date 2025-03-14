#!/usr/bin/env node

const http = require('http');
const EventSourceLib = require('eventsource');

// Function to connect to the MCP server using SSE
function connectToMCP() {
  const es = new EventSourceLib('http://localhost:8765/sse');
  
  es.onopen = () => {
    console.log('Connected to MCP server');
    
    // Send a ping message
    sendMessage({
      type: 'ping',
      id: 'ping-1'
    });
    
    // Send a capabilities request
    setTimeout(() => {
      sendMessage({
        type: 'capabilities',
        id: 'capabilities-1'
      });
    }, 1000);
  };
  
  es.onmessage = (event) => {
    try {
      const data = JSON.parse(event.data);
      console.log('Received message:', data);
      
      // If we received capabilities, try a tool call
      if (data.type === 'capabilities_response') {
        setTimeout(() => {
          sendMessage({
            type: 'tool_call',
            id: 'tool-1',
            name: 'get_video_info',
            parameters: {
              youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
            }
          });
        }, 1000);
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };
  
  es.onerror = (error) => {
    console.error('Error connecting to MCP server:', error);
    es.close();
  };
  
  return es;
}

// Function to send a message to the MCP server
function sendMessage(message) {
  const options = {
    hostname: 'localhost',
    port: 8765,
    path: '/sse',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
  };
  
  const req = http.request(options, (res) => {
    console.log(`Message sent, status: ${res.statusCode}`);
  });
  
  req.on('error', (error) => {
    console.error('Error sending message:', error);
  });
  
  req.write(JSON.stringify(message));
  req.end();
}

// Start the test
console.log('Starting Cursor simulation test...');
const es = connectToMCP();

// Close the connection after 10 seconds
setTimeout(() => {
  console.log('Test complete, closing connection');
  es.close();
}, 10000); 