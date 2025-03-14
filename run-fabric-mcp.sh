#!/bin/bash

# Change to the fabric-mcp directory
cd "$(dirname "$0")"

# Check if node_modules exists, if not install dependencies
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi

# Check if server is already running
if [ -f .fabric-mcp.pid ]; then
  PID=$(cat .fabric-mcp.pid)
  if ps -p $PID > /dev/null; then
    echo "Fabric MCP server is already running (PID: $PID)"
    exit 0
  else
    # Remove stale PID file
    rm .fabric-mcp.pid
  fi
fi

# Start the Fabric MCP server in the background
npm run dev > .fabric-mcp.log 2>&1 &

# Save the process ID
echo $! > .fabric-mcp.pid

echo "Fabric MCP server started on port 3011 (PID: $(cat .fabric-mcp.pid))"

# Output the path to the config file
echo "MCP configuration file: $(pwd)/fabric-mcp-config.json"
echo "Use this file path when configuring the MCP in Cursor" 