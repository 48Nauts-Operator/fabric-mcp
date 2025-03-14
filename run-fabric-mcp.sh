#!/bin/bash

# Change to the fabric-mcp directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Output MCP configuration in JSON format
echo '{"name":"Fabric MCP","description":"Process YouTube videos and various content types using Fabric patterns","baseUrl":"http://localhost:3011/api/mcp","version":"1.0.0"}'

# Run the Fabric MCP server in the background
npm run dev > /dev/null 2>&1 &

# Save the process ID
echo $! > .fabric-mcp.pid

echo "Fabric MCP server started on port 3011 (PID: $(cat .fabric-mcp.pid))" 