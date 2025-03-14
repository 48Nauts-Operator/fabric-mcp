#!/bin/bash

echo "Testing Fabric MCP server..."
echo "Checking health endpoint..."
curl -s http://localhost:3011/health | jq .

echo ""
echo "Testing MCP endpoint with a simple request..."
curl -s -X POST \
  -H "Content-Type: application/json" \
  -d '{
    "operation": "get_video_info",
    "params": {
      "youtubeUrl": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    }
  }' \
  http://localhost:3011/api/mcp | jq . 