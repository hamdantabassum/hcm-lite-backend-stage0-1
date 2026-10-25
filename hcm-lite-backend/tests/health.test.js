import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import mongoose from 'mongoose';
import { createApp } from '../src/app.js';

test('health endpoint reports service status and database state', async () => {
  const response = await request(createApp()).get('/api/health');
  assert.ok([200, 503].includes(response.status));
  assert.equal(typeof response.body.success, 'boolean');
  assert.equal(response.body.data.service, 'hcm-lite-api');
  assert.equal(typeof response.body.data.database, 'string');
  assert.equal(typeof response.body.data.timestamp, 'string');
});

test('unknown API v1 route returns consistent JSON 404-style response', async () => {
  const response = await request(createApp()).get('/api/v1/not-built-yet');
  assert.equal(response.status, 404);
  assert.equal(response.body.success, false);
  assert.equal(response.body.error.code, 'NOT_IMPLEMENTED');
});

test('health database status reflects mongoose connection state', async () => {
  const response = await request(createApp()).get('/api/health');
  assert.equal(response.body.data.database, ['disconnected', 'connected', 'connecting', 'disconnecting'][mongoose.connection.readyState]);
});
