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
    echo "Stopping existing server..."
    kill $PID
    rm .fabric-mcp.pid
    sleep 2
  else
    # Remove stale PID file
    rm .fabric-mcp.pid
  fi
fi

echo "Starting Fabric MCP server in debug mode (foreground)..."
echo "Press Ctrl+C to stop the server"
echo ""

# Run the server in the foreground to see any errors
npm run dev 