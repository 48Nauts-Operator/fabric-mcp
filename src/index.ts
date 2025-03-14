import express, { Request, Response } from 'express';
import cors from 'cors';
import config from './config';
import mcpController from './controllers/mcp.controller';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req: Request, res: Response) => {
  res.status(200).json({ status: 'ok', message: 'Fabric MCP is running' });
});

// MCP endpoint
app.post('/api/mcp', async (req: Request, res: Response) => {
  await mcpController.handleMCPRequest(req, res);
});

// Start server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${config.server.nodeEnv} mode`);
});

export default app; 