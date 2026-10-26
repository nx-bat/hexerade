import { createClient, SocketClosedUnexpectedlyError } from '@redis/client';
import { Client } from 'discord.js';
import { banUpdateHandler, ticketUpdateHandler, appealUpdateHandler, logging } from '../utils';

let discordClient: Client;

export async function openRedisClient(url: string, discClient: Client) {
  const client = await createClient({
    url: `redis://${url}`,
    socket: {
      reconnectStrategy: 60000
    }
  });

  client.on('error', (error) => {
    if (error.code == 'ECONNREFUSED') {
      logging.error('REDIS', "Couldn't connect to redis database: Connection refused (is redis on? is the port reachable?)");
    } else if (error instanceof SocketClosedUnexpectedlyError) {
      logging.error('REDIS', 'Redis server closed unexpectedly. Attempting reconnect every 60 seconds.');
    } else {
      logging.error('REDIS', `Redis Error: ${error}`);
    }
  });

  client.on('connect', () => {
    logging.info('REDIS', 'Connected to redis!');
  });

  client.on('reconnecting', () => {
    logging.warn('REDIS', 'Connection lost, attempting to reconnect.');
  });

  client.once('connect', () => {
    client.subscribe(['ticket_updates', 'ban_updates', 'appeal_updates'], updateHandler);
  });

  client.connect();

  discordClient = discClient;
}

function updateHandler(data: string, channel: string) {
  switch (channel) {
    case 'ticket_updates':
      return ticketUpdateHandler(discordClient, data);
    case 'ban_updates':
      return banUpdateHandler(discordClient, data);
    case 'appeal_updates':
      return appealUpdateHandler(discordClient, data);
  }
}
