import { Client } from 'discord.js';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { config } from '../config';
import routes from './routes';
import { logging } from '../utils';

export function initializeWebserver(client: Client) {
  const app = new Hono();

  routes.forEach(route => app.route(route.route, route.builder(client)));

  const server = serve({
    fetch: app.fetch,
    port: config.PORT
  }, (info) => {
    logging.info('WEBSERVER >> initializeWebserver()', `Listening @ port: ${info.port}`);
  });

  return server;
}
