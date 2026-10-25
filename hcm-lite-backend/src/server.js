import env from './config/env.js';
import { connectDatabase, disconnectDatabase } from './config/database.js';
import { createApp } from './app.js';

let server;

async function start() {
  await connectDatabase(env.mongoUri);
  const app = createApp();
  server = app.listen(env.port, () => {
    console.log(`HCM Lite API listening on port ${env.port} (${env.nodeEnv})`);
  });
}

async function shutdown(signal) {
  console.log(`${signal} received; shutting down gracefully...`);
  if (server) {
    await new Promise((resolve) => server.close(resolve));
  }
  await disconnectDatabase();
  process.exit(0);
}

process.on('SIGINT', () => void shutdown('SIGINT'));
process.on('SIGTERM', () => void shutdown('SIGTERM'));

start().catch((error) => {
  console.error('Failed to start HCM Lite API:', error.message);
  process.exit(1);
});
