import { Client } from 'discord.js';
import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import routes from './routes';

export function initializeWebserver(client: Client) {
  const app = new Hono();

  routes.forEach(route => app.route(route.route, route.builder(client)));

  const server = serve({
    fetch: app.fetch,
    port: process.env.PORT
  }, (info) => {
    console.log(`Listening on port ${info.port}`);
  });

  return server;
}
