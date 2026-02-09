import WebSocket from 'ws';

import { addResponse } from '../event/index.js';

import type { SendRconCommand } from '../types/api/sendRconCommand';
import type { Response } from '../types/event';
export async function sendRconCommand(
  ws: WebSocket,
  command: string,
): Promise<Response> {
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  const payload: SendRconCommand = {
    api: 'send_rcon_command',
    data: {
      command,
    },
    echo: echoId,
  };
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
