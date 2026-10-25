import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import env from './config/env.js';
import { notFoundHandler } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

export function createApp() {
  const app = express();

  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({
    origin(origin, callback) {
      // Requests without Origin include curl and server-to-server health checks.
      if (!origin || env.corsOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Origin is not allowed by CORS.'));
    },
    credentials: true,
  }));
  app.use(express.json({ limit: '1mb' }));
  app.use(express.urlencoded({ extended: false, limit: '1mb' }));
  app.use('/api', rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
  }));

  app.get('/api/health', (req, res) => {
    const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
    const dbState = mongoose.connection.readyState;
    const databaseConnected = dbState === 1;
    res.status(databaseConnected ? 200 : 503).json({
      success: databaseConnected,
      data: {
        status: databaseConnected ? 'ok' : 'degraded',
        service: 'hcm-lite-api',
        database: states[dbState] || 'unknown',
        timestamp: new Date().toISOString(),
      },
    });
  });

  app.use('/api/v1', (req, res, next) => {
    res.status(404).json({
      success: false,
      error: { code: 'NOT_IMPLEMENTED', message: 'This versioned endpoint is not implemented yet.' },
    });
  });

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}

export default createApp;
