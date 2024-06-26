//@ts-check
import { Hono } from 'hono';
import wallet from '../src/routes/wallet/index.js';
import transfer from '../src/routes/transfer/index.js';
import convert from '../src/routes/convert/index.js';
import request from '../src/routes/request/index.js';
import intents from '../src/routes/intents/index.js';
import apiKeys from '../src/routes/admin/index.js';
import { handle } from '@hono/node-server/vercel';

const app = new Hono().basePath('/api');

app.route('/v1/wallet', wallet);
app.route('/v1/transfer', transfer);
app.route('/v1/convert', convert);
app.route('/v1/request', request);
app.route('/v1/intents', intents);
app.route('/v1/admin/api-keys', apiKeys);

app.notFound((c) => {
  return c.text('Custom 404 Message', 404);
});

app.onError((err, c) => {
  console.error(`${err}`);
  return c.json({ success: false, message: err.message }, 500);
});

export default handle(app);
