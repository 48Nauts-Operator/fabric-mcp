#!/bin/bash

# Change to the fabric-mcp directory
cd "$(dirname "$0")"

# Check if PID file exists
if [ -f .fabric-mcp.pid ]; then
  PID=$(cat .fabric-mcp.pid)
  
  # Check if process is running
  if ps -p $PID > /dev/null; then
    echo "Stopping Fabric MCP server (PID: $PID)..."
    kill $PID
    rm .fabric-mcp.pid
    echo "Fabric MCP server stopped"
  else
    echo "No running Fabric MCP server found with PID: $PID"
    rm .fabric-mcp.pid
  fi
else
  echo "No Fabric MCP server PID file found"
fi 