import WebSocket from 'ws';

import { addResponse } from '../event';

import type { Entity } from '../types';
import type { SendActionbar } from '../types/api/sendActionbar';
import type { Response } from '../types/event';

export async function send_actionbar(
  ws: WebSocket,
  message: Entity.TextComponent[],
): Promise<Response> {
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  const payload: SendActionbar = {
    api: 'send_actionbar',
    data: {
      message,
    },
    echo: echoId,
  };
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
