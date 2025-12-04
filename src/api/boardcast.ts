import WebSocket from 'ws';

import { addResponse } from '../event';

import type { Entity } from '../types';
import type { Boardcast } from '../types/api/boardcast';
import type { Response } from '../types/event';

export async function boardcast(
  ws: WebSocket,
  message: Entity.TextComponent[],
): Promise<Response> {
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  const payload: Boardcast = {
    api: 'broadcast',
    data: {
      message,
    },
    echo: echoId,
  };
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
