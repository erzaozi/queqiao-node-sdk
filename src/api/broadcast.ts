import WebSocket from 'ws';

import { addResponse } from '../event/index.js';

import type { Entity } from '../types';
import type { Broadcast } from '../types/api/broadcast';
import type { Response } from '../types/event';

export async function broadcast(
  ws: WebSocket,
  message: Entity.TextComponent[],
): Promise<Response> {
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  const payload: Broadcast = {
    api: 'broadcast',
    data: {
      message,
    },
    echo: echoId,
  };
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
