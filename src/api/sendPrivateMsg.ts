import WebSocket from 'ws';

import { addResponse } from '../event';

import type { Entity } from '../types';
import type { SendPrivateMsg } from '../types/api/sendPrivateMsg';
import type { Response } from '../types/event';

export async function send_private_msg(
  ws: WebSocket,
  message: Entity.TextComponent[],
  options: { uuid?: string; nickname?: string },
): Promise<Response> {
  const { uuid, nickname } = options;
  if (uuid === undefined && nickname === undefined) {
    throw new Error('uuid or nickname is required');
  }
  const echoId = String(Date.now()) + Math.floor(Math.random() * 10000);
  const payload: SendPrivateMsg = {
    api: 'send_private_msg',
    data:
      uuid !== undefined ? { uuid, message } : { nickname: nickname!, message },
    echo: echoId,
  };
  ws.send(JSON.stringify(payload));
  return await addResponse(echoId, 5000);
}
