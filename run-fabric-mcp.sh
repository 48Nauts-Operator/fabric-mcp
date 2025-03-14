#!/bin/bash

# Change to the fabric-mcp directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Start the Fabric MCP server in the background
npm run dev > /dev/null 2>&1 &

# Save the process ID
echo $! > .fabric-mcp.pid

# Wait for the server to start
sleep 2

# Output MCP configuration in JSON format (this is what Cursor reads)
cat << EOF
{
  "name": "Fabric MCP",
  "description": "Process YouTube videos and various content types using Fabric patterns",
  "baseUrl": "http://localhost:3011/api/mcp",
  "version": "1.0.0"
}
EOF

# Log to a separate file that won't interfere with the JSON output
echo "Fabric MCP server started on port 3011 (PID: $(cat .fabric-mcp.pid))" > .fabric-mcp.log 